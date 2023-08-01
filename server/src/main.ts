import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `http://${process.env.HOST}:${process.env.FRONT_PORT}`, // замените на домен вашего фронтенд-приложения
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.SERVER_PORT || 5000);
}
bootstrap();
