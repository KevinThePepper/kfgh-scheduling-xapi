import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class AuthLoginDTO {
  @Exclude()
  private _password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  get password(): string {
    return this._password;
  }

  set password(pass: string) {
    this._password = Buffer.from(pass, "base64").toString("utf-8");
  }
}
