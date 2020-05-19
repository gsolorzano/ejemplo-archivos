import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { QueryResult } from 'pg';
import { pool } from '../database/connection';
import path from 'path'
import Save from './savefile'
import fs from 'fs'

export class FileController {


    async saveFile(req: Request, res: Response): Promise<Response> {
        const query = `SELECT insertdocumet($1,$2,$3);`;
        //const client: PoolClient = await pool.connect();
        try {
            let vals = await Save(req, res);
            console.log(vals[0]);
            //let url = path.join(__dirname + '../../..' + '/public/' + req.body.tabla + '/' + vals[0]);
            let url = `${req.body.tabla}/${vals[0]}`;
            console.log(url)
            let n = JSON.parse(req.body.autores)
            console.log(`${req.body.tabla}/${vals[0]}`);
            console.log(n[1].nombre);
            console.log(vals[1])
            const values = [vals[0],url,vals[1]];
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

    async getProjectAll (req: Request, res: Response): Promise<Response>{
        const query = `select getprojectsall('projectsCursor');`;
        const fetch = `FETCH ALL IN "projectsCursor";`;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(query)
            const projects: QueryResult = await client.query(fetch);
            await client.query('ROLLBACK');
            client.release();
            return res.json(projects.rows);
        } catch (error) {
            console.log(error);
            return res.send({
                msg: 'Internal Server Error'
            });
        }
    }


    async getProjectById (req: Request, res: Response): Promise<Response>  {
        const getProject = `select getprojectbyid($1,'projectCursor');`;
        const fetchProject = `FETCH ALL IN "projectCursor";`;
        const client = await pool.connect();
        try {
            const id_project = req.params.id_project; // asi se llama el id de lo que llega aqui 
            await client.query('BEGIN');
            await client.query(getProject, [id_project]);
            const project: QueryResult = await client.query(fetchProject);
            await client.query('ROLLBACK');
            client.release();
            return res.json(
                project.rows[0]
            );
        } catch (error) {
            await client.query('ROLLBACK');
            client.release();
            console.log(error);
            return res.send({
                msg: 'Internal Server Error'
            });
        }
    }

    async deleteFile (req: Request, res: Response): Promise<Response>  {
        const deleteD = `select deletedocument($1);`;
        //const client = await pool.connect();
        try {
            const id= req.body.dni;
            const p = req.body.path;
            let fullPath = path.join(__dirname + '../../..' + '/public/' + p);
            console.log(id);
            console.log(fullPath);
            fs.unlinkSync(fullPath);
            await pool.query('BEGIN');
            await pool.query(deleteD, [id]);
            await pool.query('COMMIT');
            return res.json(
                {res:"Exito"}
            );
        } catch (error) {
            console.log(error);
            return res.send({
                msg: 'Internal Server Error'
            });
        }
    }


}

const fileController = new FileController();
export default fileController;