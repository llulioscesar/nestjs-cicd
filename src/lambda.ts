import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as serverless from 'aws-serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();

  app.enableCors({
    origin: '*',
  });

  const server = serverless.createServer(expressApp);
  return server;
}

let cachedServer: serverless.Server;

export const handler = async (event: any, context: any): Promise<any> => {
    if (!cachedServer) {
        const server = await bootstrap();
        cachedServer = server;
    }

    return serverless.proxy(cachedServer, event, context, 'PROMISE').promise;
}