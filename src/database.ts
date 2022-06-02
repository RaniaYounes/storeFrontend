import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_TEST_NAME,
  DB_PORT,
  ENV
} = process.env;

let options;

if (ENV === "test") {
  options = {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port:Number( DB_PORT)
  };
}
if (ENV === "dev") {
  options = {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port:Number( DB_PORT)
  };
}

const client = new Pool(options);

export default client;
