import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { SchedulerService } from "./scheduler.service";
import { Scheduler, SchedulerCreate } from "./scheduler.proto";
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";

@Controller()
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @GrpcMethod("SchedulerService", "FineOne")
  findOne(
    data: SchedulerCreate,
    meta: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Scheduler {
    return;
  }
}
