import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd, ".env")) });

export default {
  node_env:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_pas: process.env.DEFAULT_PASS,
  salt_rounds: process.env.SALT_NUMBER,
};
