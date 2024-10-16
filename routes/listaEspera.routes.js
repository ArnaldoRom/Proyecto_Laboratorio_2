import { Router } from "express";
import {
  getListaEpera,
  getListaEperaId,
  añadirListaEspera,
  sacarPacienteDeListaEspera,
  primerPaciente,
} from "../controllers/listaEspera.controllers.js";

const router = Router();

router.get("/listaEspera", getListaEpera);

router.get("/listaEspera/:id", getListaEperaId);

router.post("/listaEspera/nueva", añadirListaEspera);

router.delete("/listaEspera/:idPaciente/:idAgenda", sacarPacienteDeListaEspera);

router.get("/listaEspera/a/:id", primerPaciente);

export default router;
