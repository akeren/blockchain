import { IAppConfig } from '@src/config/interface';

const app: IAppConfig = {
  name: process.env.APP_NAME || 'Blockchain Service',
  port: process.env.APP_PORT || '3000',
  host: process.env.APP_HOST || 'http://127.0.0.1',
  env: process.env.NODE_ENV || 'production',
};

export { app };
