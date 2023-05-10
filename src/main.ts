import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import installSwagger from './commons/swagger/installSwagger';
import installValidationPipe from './commons/validation/installValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'verbose'],
  });
  installSwagger(app);
  installValidationPipe(app);
  await app.listen(3000);
}

bootstrap();
