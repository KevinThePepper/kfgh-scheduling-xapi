import { Module } from "@nestjs/common";
import { WorkerController } from "./worker.controller";
import { WorkerService } from "./worker.service";
import { SchedulerModule } from "./scheduler/scheduler.module";

@Module({
  imports: [SchedulerModule],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
