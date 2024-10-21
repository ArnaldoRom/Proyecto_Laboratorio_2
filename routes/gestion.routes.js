import { Router } from "express";
import {
  agregarSucursal,
  getSucursal,
  getSucursalId,
  agregarCalendario,
  getCalendario,
  getCalendarioId,
  actualizarCalendario,
} from "../controllers/gestion.controllers.js";

const router = Router();

router.post("/gestion/sucursal", agregarSucursal);

router.post("/gestion/calendario", agregarCalendario);

router.get("/gestion/sucursal", getSucursal);

router.get("/gestion/calendario", getCalendario);

router.get("/gestion/sucursal/:id", getSucursalId);

router.get("/gestion/calendario/:id", getCalendarioId);

router.post("/gestion/calendario/actualizar/:id", actualizarCalendario);

export default router;
