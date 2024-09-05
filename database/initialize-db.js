import { createConnection, createPool } from "mysql2";
import {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} from '../server/config.js';
import fs from 'fs';
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const initializeDatabase = async () => {
    const pool = createPool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD
    })

    try {
        pool.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
        console.log('>>> Database verified/created')

        const dbPool = createPool({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        })

        const createTableSQL = fs.readFileSync(join(__dirname, './db.sql'), 'utf8');
        // console.log('createTableSQL', createTableSQL)

        dbPool.query(createTableSQL);
        console.log('>>> Tables created successfully')

    } catch (error) {
        console.log('>>> Error initializing database: ', error);
    }
}

// initalizeDatabase();
