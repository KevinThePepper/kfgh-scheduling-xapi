import { Injectable } from "@nestjs/common";
import { CreateSchedulerDto } from "./dto/create-scheduler.dto";

@Injectable()
export class SchedulerService {
  create(createSchedulerDto: CreateSchedulerDto) {
    return "This action adds a new scheduler";
  }
}
