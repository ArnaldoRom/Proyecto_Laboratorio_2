import { Router } from "express";
import {
  getPacientes,
  getPacienteId,
  crearPaciente,
  actualizarPaciente,
  borrarPaciente,
} from "../controllers/paciente.controller.js";

const router = Router();

router.get("/paciente", getPacientes);

router.get("/paciente/:id", getPacienteId);

router.post("/paciente", crearPaciente);

router.put("/paciente", actualizarPaciente);

router.delete("/paciente", borrarPaciente);

export default router;
