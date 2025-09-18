import { startServer } from './server.js';
import { createLogger } from '@echo/shared';

const logger = createLogger({ scope: 'apps/bff', level: 'info' });
const port = Number(process.env.PORT ?? 4000);

startServer(port)
  .then(() => {
    logger.info('BFF ready', { url: `http://localhost:${port}` });
  })
  .catch((error) => {
    logger.error('Failed to start BFF', { error: error instanceof Error ? error.message : String(error) });
    process.exit(1);
  });
