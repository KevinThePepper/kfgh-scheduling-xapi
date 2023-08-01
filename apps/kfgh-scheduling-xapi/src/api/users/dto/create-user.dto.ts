import { IsAppStrongPassword } from "@app/api/auth";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @Exclude()
  private _password1: string;
  @Exclude()
  private _password2: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  active?: boolean;

  @ApiProperty()
  @IsAppStrongPassword()
  get password1(): string {
    return this._password1;
  }

  set password1(password: string) {
    this._password1 = Buffer.from(password, "base64").toString("utf-8");
  }

  @ApiProperty()
  @IsAppStrongPassword()
  get password2(): string {
    return this._password2;
  }

  set password2(password: string) {
    this._password2 = Buffer.from(password, "base64").toString("utf-8");
  }
}
