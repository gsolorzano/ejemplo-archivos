import { Router } from 'express';
import Career_Controller from '../controllers/files.controller'

const router = Router();

router.post('/', Career_Controller.saveFile);
router.get('/', Career_Controller.getProjectAll);
router.get('/:id_project', Career_Controller.getProjectById);

export default router;