import { Pool } from "pg";
import { Client } from "pg";

const client = new Client({
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   database: process.env.DB,
   })

  await client.connect();

  export { client };
