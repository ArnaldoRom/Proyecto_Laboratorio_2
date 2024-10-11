import { Router } from "express";
import {
  getListaEpera,
  getListaEperaId,
  añadirListaEspera,
  actualizarListaEspera,
} from "../controllers/listaEspera.controllers.js";

const router = Router();

router.get("/listaEspera", getListaEpera);

router.get("/listaEspera/:id", getListaEperaId);

router.post("/listaEspera/nueva", añadirListaEspera);

router.patch("/listaEspera/:id", actualizarListaEspera);

export default router;
