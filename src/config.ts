import { config } from "dotenv";

config();
const {
  PORT,
  NODE_ENV,
  PGHOST,
  PGPORT,
  PG_DB,
  PG_DB_TEST,
  PGUSER,
  PGPASSWORD,
  BC_PASSWORD,
  SALT_ROUND,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  host: PGHOST,
  pg_port: PGPORT,
  database: NODE_ENV === "dev" ? PG_DB : PG_DB_TEST,
  user: PGUSER,
  password: PGPASSWORD,
  pepper: BC_PASSWORD,
  salt: SALT_ROUND,
  jwtSecret: TOKEN_SECRET,
};
