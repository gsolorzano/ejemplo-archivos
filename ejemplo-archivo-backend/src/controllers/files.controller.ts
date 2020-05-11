import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { pool } from '../database/connection';
import multer from 'multer';
import path from 'path'

var filename = "";
var type = "";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var url = path.join('public/'+req.body.tabla)
        type = req.body.tabla;
        cb(null, url)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
        // console.log(req.body.tabla);
        filename = Date.now() + '-' + file.originalname;
    }
})

const upload = multer({ storage: storage }).single('file')

export class FileController {


    async saveFile(req: Request, res: Response): Promise<Response> {
        // const query = `select getcenters('centersCursor'); `;
        // const client: PoolClient = await pool.connect();
        try {
            await upload(req, res, function (err: any) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err)
                } else if (err) {
                    return res.status(500).json(err)
                }
                //return res.status(200).send(req.file)
            });
            console.log(filename);
            //console.log(path.join(__dirname+'../../..' + '/public/' + type + '/' + filename));
            var url = path.join(__dirname+'../../..' + '/public/' + type + '/' + filename);
            // const values = [req.body.career_code, req.body.name, req.body.degree];

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