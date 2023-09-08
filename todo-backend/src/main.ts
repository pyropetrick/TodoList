import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });

  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Description of BD for TodoList')
    .setDescription('Docs for REST API')
    .setVersion('1.0.0')
    .addTag('Created by Pavel Chernenko')
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });
  await app.listen(port);
}
bootstrap();
