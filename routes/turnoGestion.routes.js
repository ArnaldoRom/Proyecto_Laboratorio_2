import { Router } from "express";
import {
  reservarTurno,
  getTurno,
  getTurnoId,
  cambiarEstado,
  getSobreTurnos,
  crearSobreTurno,
  retirarPaciente,
} from "../controllers/turnosGestion.controllers.js";

const routes = Router();

//----------------- TURNOS --------------------------//

routes.post("/turno/reservar", reservarTurno);

routes.get("/turnos", getTurno);

routes.post("/turno/estado", cambiarEstado);

routes.get("/turno/:id", getTurnoId);

//--------------------- SOBRE TURNOS ---------------------//

routes.get("/SobreTurnos", getSobreTurnos);

routes.post("/SobreTurno/agregar", crearSobreTurno);

routes.post("/SobreTurno/retirarPaciente/:id", retirarPaciente);

//--------------------- LISTA ESPERA ----------------------//

export default routes;
