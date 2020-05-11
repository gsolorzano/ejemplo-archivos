import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';

export class FileController {

    async saveFile(req: Request, res: Response): Promise<Response> {
        const query = `select getcenters('centersCursor'); `;
        const client: PoolClient = await pool.connect();
        try {
            const values = [req.body.career_code, req.body.name, req.body.degree];

            await client.query('BEGIN');
            await client.query(query, values);
            await client.query('COMMIT');

            client.release();

            return res.status(200).json({
                msg: 'New Career created'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }

}

const fileController = new FileController();
export default fileController;