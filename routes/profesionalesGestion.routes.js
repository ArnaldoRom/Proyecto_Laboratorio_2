import { Router } from "express";
import {
  crearEspecialidad,
  obtenerEspecialidades,
  //activarEspecialidad,
  crearProfesional,
  actualizarProfesional,
  altaProfesional,
  bajaProfesional,
  crearProfesionalEspecializado,
  obtenerProfesionalesEspecializados,
  actualizarProfesionalEspecializado,
  eliminarProfesionalEspecializado,
} from "../controllers/profesionalesGestion.controllers.js";

const router = Router();

// Rutas para Especialidades
router.post("/especialidades", crearEspecialidad);
router.get("/especialidades", obtenerEspecialidades);
//router.post("/especialidades/:id/actualizar", actualizarEspecialidad);
//router.post("/especialidades/:id/desactivar", desactivarEspecialidad);
//router.post("/especialidades/:id/activar", activarEspecialidad);

// Rutas para Profesionales
router.post("/profesionales", crearProfesional);
router.post("/profesionales/:id/actualizar", actualizarProfesional);
router.post("/profesionales/:id/alta", altaProfesional);
router.post("/profesionales/:id/baja", bajaProfesional);

// Rutas para Profesionales Especializados
router.post("/profesionales-especializados", crearProfesionalEspecializado);
router.get("/profesionales-especializados", obtenerProfesionalesEspecializados);
router.post(
  "/profesionales-especializados/:id/actualizar",
  actualizarProfesionalEspecializado
);
router.post(
  "/profesionales-especializados/:id/eliminar",
  eliminarProfesionalEspecializado
);

export default router;
