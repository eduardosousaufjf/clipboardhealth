import { INestApplication } from '@nestjs/common';
import { CustomLogger } from './customLogger';

const installLogger = (app: INestApplication) =>
  app.useLogger(app.get(CustomLogger));

export default installLogger;
