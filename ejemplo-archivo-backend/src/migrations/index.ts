import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const Creation = readFileSync('src/database/create.sql').toString();
const Sps = readFileSync('src/database/spsDrops.sql').toString();
const Consultas = readFileSync('src/database/consultas.sql').toString();

async function migration() {
    try {
        await pool.query(Sps);
        await pool.query(Creation);
        await pool.query(Consultas);
        return;
    } catch (error) {
        console.log(error);
    }
}

migration();