import { Router } from "express";
import pool from "../db.js";

const router = Router()

router.get('/ping', async (req, res) => {
    const [ rows, fields ] = await pool.query('SELECT 1 + 1 AS result')
    console.log('>> routes: ', rows, fields)
    res.json(rows[0]);
})

export default router;
