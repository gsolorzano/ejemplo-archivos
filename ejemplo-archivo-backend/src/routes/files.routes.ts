import { Router } from 'express';
import Career_Controller from '../controllers/files.controller'

const router = Router();

router.post('/', Career_Controller.saveFile);

export default router;