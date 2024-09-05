import { createPool } from "mysql2/promise";
import {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME} from './config.js';

console.log('----- aquí db')
 const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export default pool;
// function createPoolDB() {
//     try {
//         const pool = createPool({
//             host: DB_HOST,
//             port: DB_PORT,
//             user: DB_USER,
//             password: DB_PASSWORD,
//             database: DB_NAME
//         });
//         return pool
//     } catch (error) {
//         console.error('NO SE PUDO CONECTAR A LA BASE DE DATOS')
//         return pool;
//     }
// }

// export default createPoolDB();
