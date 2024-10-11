import { Router } from "express";
import {
  getPacientes,
  getPacienteId,
  crearPaciente,
  actualizarPaciente,
  bajaPaciente,
  altaPaciente,
} from "../controllers/paciente.controller.js";

const router = Router();

// Ruta para obtener una lista de todos los pacientes
router.get("/pacientes", getPacientes);

//Ruta para obtener un solo paciente por su ID
router.get("/paciente/:id", getPacienteId);

//Ruta para crear un nuevo paciente
router.post("/paciente/nuevo", crearPaciente);

//Ruta para actualizar un paciente por ID
router.patch("/paciente/:id", actualizarPaciente);

// Ruta de BORRADO LOGICO para un paciente
router.patch("/paciente/baja/:id", bajaPaciente);

//Ruta de ALTA LOGICA para un paciente
router.patch("/paciente/alta/:id", altaPaciente);

export default router;
