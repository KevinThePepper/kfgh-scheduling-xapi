const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class User1689557966637 {
  name = "User1689557966637";

  async up(queryRunner) {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS user_management`);
    await queryRunner.query(
      `CREATE TABLE "user_management"."user" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP SCHEMA IF EXISTS user_management CASCADE`);
    await queryRunner.query(`DROP TABLE "user_management"."user"`);
  }
};
