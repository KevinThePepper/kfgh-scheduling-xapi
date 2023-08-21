import { Privilege } from "@app/api/auth/auth.types";
import { BaseEntityMixin } from "@app/common";
import { Role } from "@app/api/roles/entities/role.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

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

  @ApiProperty({
    description: "The roles this user assumes",
    default: [],
    type: [Role],
  })
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    description:
      "Privileges assigned specifically to ths user outside of roles",
    default: [],
    type: Array<Privilege>,
  })
  @Column("text", { array: true, default: [], nullable: true })
  privileges: Privilege[];
}
