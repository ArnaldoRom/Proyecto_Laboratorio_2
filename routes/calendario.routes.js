import { Router } from "express";
import {
  getCalendario,
  getCalendarioId,
  crearCalendario,
  actualizarCalendario,
  bajaCalendario,
  altaCalendario,
} from "../controllers/calendario.controllers.js";

const router = Router();

router.get("/calendario", getCalendario);

router.get("/calendario/:id", getCalendarioId);

router.post("/calendario/nuevo", crearCalendario);

router.patch("/calendario/:id", actualizarCalendario);

router.patch("/calendario/baja/:id", bajaCalendario);

router.patch("/calendario/alta/:id", altaCalendario);

export default router;
