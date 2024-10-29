import { Router } from "express";
import {
  crearEspecialidad, 
  obtenerEspecialidades,
  desactivarEspecialidad,
  activarEspecialidad,
  crearProfesional,
  actualizarProfesional,
  altaProfesional,
  bajaProfesional,
  obtenerProfesional,
  crearProfesionalEspecializado,
  obtenerLista,
  //obtenerProfesionalesEspecializados,
  actualizarProfesionalEspecializado,
  eliminarProfesionalEspecializado,
} from "../controllers/profesionalesGestion.controllers.js";

const router = Router();

// Rutas para Especialidades
router.post("/especialidades", crearEspecialidad);
router.get("/especialidades", obtenerEspecialidades);
router.post("/especialidades/:id/desactivar", desactivarEspecialidad);
router.post("/especialidades/:id/activar", activarEspecialidad);


// Rutas para Profesionales
router.post("/profesionales", crearProfesional);
//router.post("/profesionales/:id/actualizar", actualizarProfesional);
router.get("/profesionales", obtenerLista)
router.get("/profesionales/:nombre", obtenerProfesional), 
router.post("/profesionales/alta/:id", altaProfesional);
router.post("/profesionales/baja/:id", bajaProfesional);


// Rutas para Profesionales Especializados
router.post("/profesionales-especializados", crearProfesionalEspecializado);
//router.get("/profesionales-especializados", obtenerProfesionalesEspecializados);
router.post("/profesionales-especializados/:id/actualizar", actualizarProfesionalEspecializado);
router.post("/profesionales-especializados/:id/eliminar", eliminarProfesionalEspecializado);

export default router;

