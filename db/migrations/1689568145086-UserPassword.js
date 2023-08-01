const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UserPassword1689568145086 {
    name = 'UserPassword1689568145086'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_management"."user" ADD "password" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_management"."user" DROP COLUMN "password"`);
    }
}
