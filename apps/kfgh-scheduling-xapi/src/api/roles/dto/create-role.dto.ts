import { Privilege, Privileges, privileges } from "@app/api/auth/auth.types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @ApiPropertyOptional({ isArray: true, type: "enum", enum: Privileges })
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsIn(privileges, { each: true })
  privileges?: Privilege[];
}
