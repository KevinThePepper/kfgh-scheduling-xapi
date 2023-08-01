import { NestFactory } from "@nestjs/core";
import { WorkerModule } from "./worker.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  // const app = await NestFactory.create(WorkerModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerModule,
    {
      transport: Transport.GRPC,
      options: {
        package: "scheduler",
        protoPath: join(__dirname, "scheduler/scheduler.proto"),
      },
    },
  );
  await app.listen();
}
bootstrap();
