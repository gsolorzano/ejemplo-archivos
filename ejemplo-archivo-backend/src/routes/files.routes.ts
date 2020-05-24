import { Router } from "express";
import Career_Controller from "../controllers/files.controller";
import upload from "../controllers/savefile";

const router = Router();

router.post("/", upload, Career_Controller.saveFile);
router.get("/", Career_Controller.getProjectAll);
router.get("/:id_project", Career_Controller.getProjectById);
router.delete("/", Career_Controller.deleteFile);

export default router;
