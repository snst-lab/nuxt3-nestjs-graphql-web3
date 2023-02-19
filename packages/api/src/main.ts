import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      https: {
        key: readFileSync('../../certificate/localhost-key.pem'),
        cert: readFileSync('../../certificate/localhost.pem'),
      },
    }),
  );
  await app.enableCors();
  await app.listen(4000, '0.0.0.0');
}
bootstrap();
