import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('catalog');
  await app.listen(process.env.PORT ?? 4100);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start catalog service', error);
  process.exit(1);
});
