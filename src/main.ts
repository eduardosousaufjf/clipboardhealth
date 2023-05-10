import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import installSwagger from './commons/swagger/installSwagger';
import installValidationPipe from './commons/validation/installValidationPipe';
import installLogger from './commons/logger/installLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  installLogger(app);
  installSwagger(app);
  installValidationPipe(app);
  await app.listen(3000);
}

bootstrap();
