import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["password1", "password2"]),
) {}
