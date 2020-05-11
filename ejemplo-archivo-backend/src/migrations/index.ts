import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const Creation = readFileSync('src/database/create.sql').toString();

async function migration() {
    try {
        await pool.query(Creation);
        return;
    } catch (error) {
        console.log(error);
    }
}

migration();