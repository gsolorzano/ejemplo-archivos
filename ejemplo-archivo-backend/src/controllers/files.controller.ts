import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import path from 'path'
import Save from './savefile'

export class FileController {


    async saveFile(req: Request, res: Response): Promise<Response> {
        const query = `SELECT insertdocumet($1,$2,$3);`;
        //const client: PoolClient = await pool.connect();
        try {
            var vals = await Save(req, res);
            console.log(vals[0]);
            var url = path.join(__dirname + '../../..' + '/public/' + req.body.tabla + '/' + vals[0]);
            console.log(url)
            var n = JSON.parse(req.body.autores)
            console.log(n[1].nombre);
            console.log(vals[1])
            const values = [vals[2],url,vals[1]];
            await pool.query('BEGIN');
            await pool.query(query, values);
            await pool.query('COMMIT');
            // pool.release();
            return res.status(200).json({
                path: url
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error');
        }
    }

}

const fileController = new FileController();
export default fileController;