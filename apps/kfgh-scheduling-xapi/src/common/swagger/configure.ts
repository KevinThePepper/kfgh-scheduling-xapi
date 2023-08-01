import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ISwaggerOptions } from "./types";
import { Version } from "../common.versioning";

export const initSwaggerDocument = (options: ISwaggerOptions) => {
  const {
    app,
    title = "KFGH Scheduler",
    description = "Manages scheduling and users for the KFGH Scheduler portal",
    version = "1.0",
    path = "api/:version/docs",
  } = options;

  // swagger docs
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag("kfgh-scheduler")
    .addSecurity("jwt", {
      type: "http",
      scheme: "bearer",
    });

  for (const value in Version) {
    const version = Version[value];
    const versionConfig = config.setVersion(version).build();
    const document = SwaggerModule.createDocument(app, versionConfig);
    SwaggerModule.setup(path, app, document);
  }
};
