import { Router } from 'express';
import Career_Controller from '../controllers/files.controller'

const router = Router();

router.get('/', Career_Controller.saveFile);

export default router;