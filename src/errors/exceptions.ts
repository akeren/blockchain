import { Server } from 'http';
import { log } from '@src/utils/logger';

export function uncaughtException(error: Error): void {
  log.error('UNCAUGHT EXCEPTION! 🙄 Shutting down...');
  log.error(error.name, error.message);
  process.exit(1);
}

export function unhandledRejection(err: Error, server: Server): void {
  log.error(err.name, err.message);
  log.error('UNHANDLED REJECTION! 😞 Shutting down Server...');
  server.close(() => {
    process.exit(1);
  });
}
