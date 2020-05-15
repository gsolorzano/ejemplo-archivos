import { Router } from 'express';
import Career_Controller from '../controllers/files.controller'   


const router = Router();

router.get('/projectAll', Career_Controller.getProjectAll);
router.get('/projectid/:id_project', Career_Controller.getProjectById);




export default router;