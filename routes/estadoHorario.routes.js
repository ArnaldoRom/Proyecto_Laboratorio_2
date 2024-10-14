import { Router } from "express";
import {
  getEstadoHorario,
  getEstadoHorarioId,
  agregarEstadoHorario,
} from "../controllers/estadoHorario.controllers.js";

const router = Router();

router.get("/estado", getEstadoHorario);

router.get("/estado/:id", getEstadoHorarioId);

router.post("/paciente/nuevo", agregarEstadoHorario);

export default router;
