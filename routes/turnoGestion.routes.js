import { Router } from "express";
import {
  reservarTurno,
  getTurno,
  getTurnoId,
  cambiarEstado,
  getSobreTurnos,
  crearSobreTurno,
  retirarPaciente,
  getLista,
  crearListaEspera,
  sacarPacienteDeListaEspera,
  recuperarTurnosConfirmados,
  getTurnoPorAgenda,
} from "../controllers/turnosGestion.controllers.js";

const routes = Router();

//----------------- TURNOS --------------------------//

routes.post("/turno/reservar", reservarTurno);

routes.get("/turnos", getTurno);

routes.post("/turno/estado", cambiarEstado);

routes.get("/turno/:id", getTurnoId);

routes.get("/turno/agenda/:id", getTurnoPorAgenda);

routes.get("/turnosConfirmados/:id", recuperarTurnosConfirmados);

//--------------------- SOBRE TURNOS ---------------------//

routes.get("/SobreTurnos", getSobreTurnos);

routes.post("/SobreTurno/agregar", crearSobreTurno);

routes.post("/SobreTurno/retirarPaciente/:id", retirarPaciente);

//--------------------- LISTA ESPERA ----------------------//

routes.get("/ListaEspera", getLista);

routes.post("/ListaEspera/nueva", crearListaEspera);

routes.post("/ListaEspera/eliminar", sacarPacienteDeListaEspera);

export default routes;
