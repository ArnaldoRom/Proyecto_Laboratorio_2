import Especialidad from "../models/especialidad.js";
import Profesional from "../models/profesional.js";
import ProfesionalEspecializado from "../models/ProfecionalEspecializado.js";

// Controlador para Especialidades ---------------------------------------------

export const desactivarEspecialidad = async (req, res) => {
  const id = req.params.id;

  try {
    await Especialidad.eliminarEspecialidad(id);
    res.status(200).json({ message: "Especialidad desactivada " });
  } catch (error) {
    console.error("Error al desactivar la especialidad:", error);
    res.status(500).json({ message: "Error al desactivar la especialidad." });
  }
};

export const activarEspecialidad = async (req, res) => {
  const id = req.params.id;

  try {
    await Especialidad.activarEspecialidad(id);
    res.status(200).json({ message: "Especialidad activada " });
  } catch (error) {
    console.error("Error al activar la especialidad:", error);
    res.status(500).json({ message: "Error al activar la especialidad." });
  }
};

export const crearEspecialidad = async (req, res) => {
  const data = req.body;

  try {
    const id = await Especialidad.crearEspecialidad(data);
    res.status(201).json({ message: "Especialidad creada exitosamente", id });
  } catch (error) {
    console.error("Error al crear la especialidad:", error);
    res.status(500).json({ message: "Error al crear la especialidad." });
  }
};

export const obtenerEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.obtenerEspecialidades();
    res.status(200).json(especialidades);
  } catch (error) {
    console.error("Error al obtener las especialidades:", error);
    res.status(500).json({ message: "Error al obtener las especialidades." });
  }
}

// Controlador para Profesionales ---------------------------------------------

export const altaProfesional = async (req, res) => {
  const id = req.params.id;

  try {
    await Profesional.altaProfesional(id);
    res.status(200).json({ message: "Profesional dado de alta " });
  } catch (error) {
    console.error("Error al dar de alta al profesional:", error);
    res.status(500).json({ message: "Error al dar de alta al profesional." });
  }
};

export const bajaProfesional = async (req, res) => {
  const id = req.params.id;

  try {
    await Profesional.bajaProfesional(id);
    res.status(200).json({ message: "Profesional dado de baja" });
  } catch (error) {
    console.error("Error al dar de baja al profesional:", error);
    res.status(500).json({ message: "Error al dar de baja al profesional." });
  }
};

export const crearProfesional = async (req, res) => {
  const data = req.body;

  try {
    const id = await Profesional.crearProfesional(data);
    res.status(201).json({ message: "Profesional creado ", id });
  } catch (error) {
    console.error("Error al crear el profesional:", error);
    res.status(500).json({ message: "Error al crear el profesional." });
  }
};

export const actualizarProfesional = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await Profesional.actualizarProfesional(data, id);
    res.status(200).json({ message: "Profesional actualizado" });
  } catch (error) {
    console.error("Error al actualizar el profesional:", error);
    res.status(500).json({ message: "Error al actualizar el profesional." });
  }
};

// Controlador para Profesionales Especializados ---------------------------

export const crearProfesionalEspecializado = async (req, res) => {
  const data = req.body;

  try {
    const id = await ProfesionalEspecializado.crearProfesionalEspecializado(
      data
    );
    res.status(201).json({ message: "Profesional especializado creado", id });
  } catch (error) {
    console.error("Error al crear el profesional especializado:", error);
    res
      .status(500)
      .json({ message: "Error al crear el profesional especializado." });
  }
};

export const obtenerProfesionalesEspecializados = async (req, res) => {
  try {
    const profesionales =
      await ProfesionalEspecializado.obtenerProfesionalesEspecializados();
    res.status(200).json(profesionales);
  } catch (error) {
    console.error("Error al obtener los profesionales especializados:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los profesionales especializados." });
  }
};

export const actualizarProfesionalEspecializado = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await ProfesionalEspecializado.actualizarProfesionalEspecializado(data, id);
    res.status(200).json({ message: "Profesional especializado actualizado " });
  } catch (error) {
    console.error("Error al actualizar el profesional especializado:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar el profesional especializado." });
  }
};

export const eliminarProfesionalEspecializado = async (req, res) => {
  const id = req.params.id;

  try {
    await ProfesionalEspecializado.eliminarProfesionalEspecializado(id);
    res.status(200).json({ message: "Profesional especializado eliminado" });
  } catch (error) {
    console.error("Error al eliminar el profesional especializado:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar el profesional especializado." });
  }
};
