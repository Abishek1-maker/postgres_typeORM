import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware); //in this way you can pas the middleware to every
  // file only for functional based middleware before app.listen
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
