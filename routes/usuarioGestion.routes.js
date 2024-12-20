import { Router } from "express";
import {
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
  activarUsuario,
  cargarPaciente,
  actualizarPaciente,
  bajaPaciente,
  altaPaciente,
  getPacienteId,
  getPacienteDNI,
  getPaciente,
  crearEmpleado,
  obtenerEmpleados,
  actualizarEmpleado,
  eliminarEmpleado,
  activarEmpleado,
  traerUsuarios,
  iniciarSesion,
  obtenerPacientePorUsuario,
} from "../controllers/usuariosGestion.controllers.js";

const router = Router();
//rutas valicadion usuario

// Rutas para Usuarios
router.post("/usuarios", crearUsuario);
router.post("/iniciar-sesion", iniciarSesion);
router.get("/usuariosLista", traerUsuarios);
router.get("/usuario/obtenerPaciente", obtenerPacientePorUsuario);
router.get("/usuarios/:id", obtenerUsuario);
router.post("/usuarios/:id/actualizar", actualizarUsuario);
router.post("/usuarios/:id/eliminar", eliminarUsuario);
router.post("/usuarios/:id/activar", activarUsuario);

// Rutas para Pacientes
router.get("/pacientes", getPaciente);
router.post("/pacientes", cargarPaciente);
router.get("/pacientes/:id", getPacienteId);
router.get("/paciente/:dni", getPacienteDNI);
router.post("/pacientes/actualizar/:id", actualizarPaciente);
router.post("/pacientes/baja/:id", bajaPaciente);
router.post("/pacientes/alta/:id", altaPaciente);

// Rutas para Empleados
router.post("/empleados", crearEmpleado);
router.get("/empleados", obtenerEmpleados);
router.post("/empleados/actualizar/:id", actualizarEmpleado);
router.post("/empleados/eliminar/:id", eliminarEmpleado);
router.post("/empleados/activar/:id", activarEmpleado);

export default router;
