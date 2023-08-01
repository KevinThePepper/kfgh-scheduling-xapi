import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * A mixin for adding an ID to an entity.
 */
export class EntityIdMixin extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
}

/**
 * A mixin for adding an ID, created and updated fields to an entity.
 */
export class BaseEntityMixin extends EntityIdMixin {
  /**
   * When the record was created.
   */
  @ApiProperty({ description: "The date and time this record was created" })
  @CreateDateColumn()
  created: Date;

  /**
   * When the record was last updated.
   */
  @ApiProperty({
    description: "The date and time this record was last updated",
  })
  @UpdateDateColumn()
  updated: Date;
}
