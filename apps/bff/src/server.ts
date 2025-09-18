import http from 'node:http';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createLogger } from '@echo/shared';

export const typeDefs = `#graphql
  type Query {
    status: String!
  }
`;

export const resolvers = {
  Query: {
    status: () => 'ok'
  }
};

export interface EchoServer {
  app: express.Express;
  httpServer: http.Server;
}

const logger = createLogger({ scope: 'apps/bff', level: 'info' });

export async function createServer(): Promise<EchoServer> {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();

  app.use('/graphql', expressMiddleware(apollo));
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  const httpServer = http.createServer(app);
  return { app, httpServer };
}

export async function startServer(port: number): Promise<http.Server> {
  const { httpServer } = await createServer();
  await new Promise<void>((resolve, reject) => {
    httpServer.once('listening', resolve);
    httpServer.once('error', reject);
    httpServer.listen(port);
  });
  logger.info('BFF server listening', { port });
  return httpServer;
}
