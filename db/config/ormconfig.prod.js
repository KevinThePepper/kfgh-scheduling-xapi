/* eslint-disable @typescript-eslint/no-var-requires */
/* ****************************************************************************
 * This file is used for running migrations both locally and in production. It
 * removes references to entities and subscriptions, and references only JS
 * files when running migrations, allowing for migrations to be applied when
 * typescript is not installed.
 * ***************************************************************************/

const dotenv = require("dotenv");
const { join } = require("path");
const { DataSource } = require("typeorm");

dotenv.config();

/**
 * Database configuration.
 * @type {import("typeorm/driver/postgres/PostgresConnectionOptions").PostgresConnectionOptions}
 */
const DATABASE_CONFIG = {
  applicationName: "kfgh-scheduling",
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME ?? "test",
  password: process.env.DATABASE_PASSWORD ?? "test",
  database: process.env.DATABASE_NAME || "kfgh",
  logging: process.env.DATABASE_LOGGING === "true",
  synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
  migrationsTableName: "migrations",
  migrationsRun: true,
  migrations: [join(__dirname, "../../", "**/db/migrations/*.js")],
  ssl:
    process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  uuidExtension: "pgcrypto",
  installExtensions: true,
};

const source = new DataSource(DATABASE_CONFIG);

module.exports = {
  source,
};
module.exports.default = DATABASE_CONFIG;
