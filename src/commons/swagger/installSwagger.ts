import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const installSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Clipboard - Take home')
    .setDescription('Candidate challenge - Shift eligibility')
    .setVersion('1.0')
    .addTag('shift')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

export default installSwagger;
