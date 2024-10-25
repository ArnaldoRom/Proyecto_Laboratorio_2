import { Router } from "express";
import {
  crearAgenda,
  getAgendas,
  getAgendaId,
  filtroEspecialidad,
  filtroProfecional,
  filtroEstadoTurno,
  filtroClasificacion
} from "../controllers/agendaGestion.controllers.js";

const router = Router();

router.post("/agenda/nueva", crearAgenda);

router.get("/agendas", getAgendas);

router.get("/agendas/clasificacion/:nombre", filtroClasificacion)

router.get("/agenda/especialidad/:nombre", filtroEspecialidad);

router.get("/agenda/profecional/:nombre", filtroProfecional);

router.get("/agenda/turnoLibre", filtroEstadoTurno);

router.get("/agenda/:id", getAgendaId);

export default router;
