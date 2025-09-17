import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

const typeDefs = `#graphql
  type Query {
    status: String!
  }
`;

const resolvers = {
  Query: {
    status: () => 'ok'
  }
};

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', json(), expressMiddleware(server));
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  const port = Number(process.env.PORT ?? 4000);
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log(`BFF ready at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start BFF', error);
  process.exit(1);
});
