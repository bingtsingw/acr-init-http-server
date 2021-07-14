import { Server } from 'http';
import { bootstrap } from './bootstrap';

(async () => {
  const app = await bootstrap();

  const server: Server = await app.listen(9000);
  server.timeout = 15 * 60 * 1000;
  server.keepAliveTimeout = 15 * 60 * 1000;
})();
