import { NestApplicationOptions } from '@nestjs/common';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

export async function bootstrap(adapter?: AbstractHttpAdapter) {
  const appOptions: NestApplicationOptions = {};

  let app: NestExpressApplication;
  if (adapter) {
    app = await NestFactory.create(AppModule, adapter, appOptions);
  } else {
    app = await NestFactory.create(AppModule, appOptions);
  }

  if (process.env.NODE_ENV !== 'local') {
    app.setGlobalPrefix('api/v.*');
  }

  return app;
}
