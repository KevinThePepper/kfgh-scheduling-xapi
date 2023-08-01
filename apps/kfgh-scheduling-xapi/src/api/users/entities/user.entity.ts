import { BaseEntityMixin } from "@app/common";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";

@Entity({ schema: "user_management" })
export class User extends BaseEntityMixin {
  @ApiProperty({ description: "The full name of the user" })
  @Column()
  name: string;

  @ApiProperty({ description: "The email of the user" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description:
      "Whether this user is active and can access database resources",
  })
  @Column({ default: true })
  active: boolean;

  @Column()
  @Exclude()
  password: string;
}
