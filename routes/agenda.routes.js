import { Router } from "express";
import {
  getAgenda,
  getAgendaId,
  aregarAgenda,
} from "../controllers/agenda.controllers.js";

const router = Router();

router.get("/agenda", getAgenda);

router.get("/agenda/:id", getAgendaId);

router.post("/agenda/nueva", aregarAgenda);

export default router;
