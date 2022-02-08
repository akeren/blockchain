import { createServer, Server } from 'http';
import config from '@src/config';
import { app } from '@src/app';
import { log } from '@src/utils';
import { uncaughtException, unhandledRejection } from '@src/errors';

process.on('uncaughtException', uncaughtException);

const { port, host, name } = config.app;

const server: Server = createServer(app);

server.listen(port, () => {
  log.info(`${name} running on ${host}:${port}`);
});

process.on('unhandledRejection', unhandledRejection.bind(server));
