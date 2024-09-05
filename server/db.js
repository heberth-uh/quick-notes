import { createPool, createConnection } from "mysql2/promise";
import {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} from './config.js';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function initializeDatabase() {
    let connection;
    try {
        connection = await createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD
        })

        // Crear base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

        // seleccionar la base de datos
        await connection.query(`USE ${DB_NAME}`);

        // Obtener SQL del archivo
        const sqlFile = fs.readFileSync(path.join(__dirname, '../database/db.sql'), 'utf8');
        const queries = sqlFile.split(';').filter( query => query.trim() !== '');

        // Ejecutar las consultas SQL
        for (let query of queries) {
            await connection.query(query);
        }

        console.log('Database and tables initialized successfully');
    } catch (error) {
        console.error('Error initializing database: ', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
}

// Inicializar base de datos y las tablas
await initializeDatabase();

// Conectarse a la base de datos
const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export default pool;
