import { Router } from "express";
import Career_Controller from "../controllers/files.controller";
import uploadMultiple from "../controllers/savefilemultiple";

const router = Router();

router.post("/", uploadMultiple, Career_Controller.saveFileMultiple);

export default router;