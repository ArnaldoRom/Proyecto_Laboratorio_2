import { Router } from "express";
import {
  getSucursal,
  getSucursalId,
  cargarSucursal,
  actualizarSucursal,
  bajaSucursal,
  altaSucursal,
} from "../controllers/sucursal.controllers.js";

const router = Router();

router.get("/sucursal", getSucursal);

router.get("/sucursal/:id", getSucursalId);

router.post("/sucursal/nuevo", cargarSucursal);

router.patch("/sucursal/:id", actualizarSucursal);

router.patch("/sucursal/baja/:id", bajaSucursal);

router.patch("/sucursal/alta/:id", altaSucursal);

export default router;
