import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pgConfig = {
    host: process.env.VAL_PG_HOST,
    port: process.env.VAL_PG_PORT,
    user: process.env.VAL_PG_USERNAME,
    password: process.env.VAL_PG_PASSWORD,
    database: process.env.VAL_PG_DBNAME,
    max: 25,
    idleTimeoutMillis: 5000
}

const pool = new Pool(pgConfig);

module.exports = {
    pool
};