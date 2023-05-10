import { INestApplication, ValidationPipe } from '@nestjs/common';

const installValidationPipe = (app: INestApplication) =>
  app.useGlobalPipes(new ValidationPipe());

export default installValidationPipe;
