import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import path from 'path'
import Save from './savefile'

export class FileController {


    async saveFile(req: Request, res: Response): Promise<Response> {
        // const query = `select getcenters('centersCursor'); `;
        // const client: PoolClient = await pool.connect();
        try {
            var filename = await Save(req, res);
            console.log(filename);
            var url = path.join(__dirname + '../../..' + '/public/' + req.body.tabla + '/' + filename);
            console.log(url)
            var n = JSON.parse(req.body.autores)
            console.log(n[1].nombre);
            // await client.query('BEGIN');
            // await client.query(query, values);
            // await client.query('COMMIT');
            // client.release();
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