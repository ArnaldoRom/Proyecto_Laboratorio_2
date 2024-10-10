import { Router } from "express";
import {  getNombre, validarUsuario, borrarUsuario, verificarContrasena } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuario/:nombreUsuario", getNombre);
router.get("/usuario/:contraseña", verificarContrasena);
router.post("/usuario/:id", validarUsuario);

router.delete("/usuario", borrarUsuario);

export default router;
