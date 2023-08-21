/* ****************************************************************************
 * This file is used to configure both the application during runtime and to
 * generate migrations locally. It is not intended to be run on the production
 * server since typescript is not available. For the production version, see
 * ormconfig.stripped.js.
 * ***************************************************************************/

import { Role } from "@app/api/roles/entities/role.entity";
import { User } from "@app/api/users/entities/user.entity";
import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotenv.config();
const cwd = process.cwd();

/**
 *  Database configuration.
 */
const DATABASE_CONFIG: PostgresConnectionOptions = {
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
  entities: [User, Role],
  subscribers: [join(__dirname, "../../", "**/*.subscriber.ts")],
  migrations: [join(cwd, "db/migrations/*.js")],
  ssl:
    process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  uuidExtension: "pgcrypto",
  installExtensions: true,
};

const source = new DataSource(DATABASE_CONFIG);

export { source };

export default DATABASE_CONFIG;
