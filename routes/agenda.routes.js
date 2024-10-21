import { Router } from "express";
import { crearAgenda } from "../controllers/agenda.controllers.js";

const router = Router();

router.post("/agenda/nueva", crearAgenda);

export default router;
