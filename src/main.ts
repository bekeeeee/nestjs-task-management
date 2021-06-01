import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common"
import * as config from "config"
import { AppModule } from './app.module';

async function bootstrap() {
  const serverConfig = config.get("server")
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create(AppModule);
  if(process.env.NODE_ENV === "development"){
    app.enableCors()

  }
  const Port = serverConfig.port;
  await app.listen(Port);
  logger.log(`Application listening on port ${Port}`)
}
bootstrap();
