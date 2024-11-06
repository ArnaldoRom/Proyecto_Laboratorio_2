import Usuario from "../models/Usuario.js";
import Paciente from "../models/paciente.mjs";
import Empleado from "../models/empleado.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: './token.env' }); 
const JWT_SECRET = process.env.JWT_SECRET; 

export const iniciarSesion = async (req, res) => {
  const data = req.body;

  try {
    console.log("Datos de inicio de sesión recibidos:", data);

    const usuario = await Usuario.iniciarSesion(data);

    if (!usuario) {
      console.log("Usuario no encontrado o credenciales incorrectas"); 
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    console.log("Usuario autenticado con éxito:", usuario);

    // Crear el token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      JWT_SECRET 
    );
    console.log("Token JWT generado:", token);

    // Guardar el token en una cookie 
    res.cookie("token", token);
    res.status(200).json({ message: "Inicio de sesión exitoso", rol: usuario.rol });
    console.log("Token enviado en la cookie"); 
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
};


export const crearUsuario = async (req, res) => {
  const data = req.body;

  try {
    const id = await Usuario.crearUsuario(data);
    res.status(201).json({ message: "Usuario creado ", id });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario." });
  }
};

export const obtenerUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await Usuario.obtenerUsuario(id);
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario." });
  }
};



export const traerUsuarios = async (req, res) => {
 
  try {
    const usuario = await Usuario.traerUsuarios();
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario." });
  }
};

export const actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await Usuario.actualizarUsuario(id, data);
    res.status(200).json({ message: "Usuario actualizado" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error al actualizar el usuario." });
  }
};





export const eliminarUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    await Usuario.eliminarUsuario(id);
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario." });
  }
};

export const activarUsuario = async (req, res) => {
  const id = req.params.id;

  try {
    await Usuario.activarUsuario(id);
    res.status(200).json({ message: "Usuario activado exitosamente" });
  } catch (error) {
    console.error("Error al activar el usuario:", error);
    res.status(500).json({ message: "Error al activar el usuario." });
  }
};

// Controlador para Pacientes --------------------------------------------------

export const cargarPaciente = async (req, res) => {
  const data = req.body;

  try {
    const id = await Paciente.cargarPaciente(data);
    res.status(201).json({ message: "Paciente cargado exitosamente", id });
  } catch (error) {
    console.error("Error al cargar el paciente:", error);
    res.status(500).json({ message: "Error al cargar el paciente." });
  }
};

export const actualizarPaciente = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await Paciente.actualizarPaciente(id, data);
    res.status(200).json({ message: "Paciente actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    res.status(500).json({ message: "Error al actualizar el paciente." });
  }
};

export const bajaPaciente = async (req, res) => {
  const id = req.params.id;

  try {
    await Paciente.bajaPaciente(id);
    res.status(200).json({ message: "Paciente dado de baja exitosamente" });
  } catch (error) {
    console.error("Error al dar de baja el paciente:", error);
    res.status(500).json({ message: "Error al dar de baja el paciente." });
  }
};

export const altaPaciente = async (req, res) => {
  const id = req.params.id;

  try {
    await Paciente.altaPaciente(id);
    res.status(200).json({ message: "Paciente dado de alta exitosamente" });
  } catch (error) {
    console.error("Error al dar de alta el paciente:", error);
    res.status(500).json({ message: "Error al dar de alta el paciente." });
  }
};

export const getPacienteId = async (req, res) => {
  const id = req.params.id;

  try {
    const paciente = await Paciente.getPacienteId(id);
    res.status(200).json(paciente);
  } catch (error) {
    console.error("Error al obtener el paciente:", error);
    res.status(500).json({ message: "Error al obtener el paciente." });
  }
};

export const getPaciente = async (req, res) => {
  try {
    const pacientes = await Paciente.getPaciente();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error("Error al obtener los pacientes:", error);
    res.status(500).json({ message: "Error al obtener los pacientes." });
  }
};



// Controlador empleado -----------------------
export const crearEmpleado = async (req, res) => {
  const data = req.body;

  try {
    const id = await Empleado.crearEmpleado(data);
    res.status(201).json({ message: "Empleado creado exitosamente", id });
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    res.status(500).json({ message: "Error al crear el empleado." });
  }
};

export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.obtenerEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    res.status(500).json({ message: "Error al obtener los empleados." });
  }
};

export const actualizarEmpleado = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await Empleado.actualizarEmpleado(id, data);
    res.status(200).json({ message: "Empleado actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    res.status(500).json({ message: "Error al actualizar el empleado." });
  }
};

export const eliminarEmpleado = async (req, res) => {
  const id = req.params.id;

  try {
    await Empleado.eliminarEmpleado(id);
    res.status(200).json({ message: "Empleado eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ message: "Error al eliminar el empleado." });
  }
};

export const activarEmpleado = async (req, res) => {
  const id = req.params.id;

  try {
    await Empleado.activarEmpleado(id);
    res.status(200).json({ message: "Empleado activado exitosamente" });
  } catch (error) {
    console.error("Error al activar el empleado:", error);
    res.status(500).json({ message: "Error al activar el empleado." });
  }
};

// COntrolador usua