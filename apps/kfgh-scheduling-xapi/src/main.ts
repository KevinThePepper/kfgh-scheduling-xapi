import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { initSwaggerDocument } from "./common";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSwaggerDocument({ app });

  // enables validation for restful responses
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // allow for URI versions
  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
    prefix: "",
  });

  // security
  app.use(helmet()); // mitigate common attacks with security headers
  app.enableCors(); // enable cors to limit requests to certain domains

  await app.listen(3000);
}
bootstrap();
