import { Privilege } from "@app/api/auth/auth.types";
import { BaseEntityMixin } from "@app/common";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity({ schema: "user_management" })
export class Role extends BaseEntityMixin {
  @ApiProperty({ description: "The human-readable name of the role" })
  @Column()
  name: string;

  @ApiProperty({ description: "A URL-safe slug" })
  @Column({ type: "text", unique: true })
  slug: string;

  @ApiProperty({ description: "Whether this role is active", default: true })
  @Column({ default: true })
  active: boolean;

  @ApiProperty({ description: "Privileges assigned to this role", default: [] })
  @Column("text", { array: true })
  privileges: Privilege[];
}
