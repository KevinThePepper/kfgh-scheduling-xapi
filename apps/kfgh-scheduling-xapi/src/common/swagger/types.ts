import { INestApplication } from "@nestjs/common";

export interface ISwaggerOptions {
  app: INestApplication;
  title?: string;
  description?: string;
  version?: string;
  path?: string;
}
