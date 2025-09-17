import { startServer } from './server.js';

const port = Number(process.env.PORT ?? 4000);

startServer(port)
  .then(() => {
    console.log(`BFF ready at http://localhost:${port}`);
  })
  .catch((error) => {
    console.error('Failed to start BFF', error);
    process.exit(1);
  });
