import { Router } from "express";
import {
  getAgenda,
  getAgendaId,
  aregarAgenda,
  porEspecialidad,
  porProfecional,
  porHorarioDisponible,
  porEstadosTurnos,
  porClasificacion,
} from "../controllers/agenda.controllers.js";

const router = Router();

router.get("/agenda", getAgenda);

router.get("/agenda/disponibles", porHorarioDisponible);

router.post("/agenda/nueva", aregarAgenda);

router.get("/agenda/:id", getAgendaId);

router.get("/agenda/especialidad/:nombre", porEspecialidad);

router.get("/agenda/profecional/:nombre", porProfecional);

router.get("/agenda/estado/:nombre", porEstadosTurnos);

router.get("/agenda/clasificacion/:nombre", porClasificacion);

export default router;
