import Especialidad from "../models/especialidad.js";
import Profesional from "../models/profesional.js";
import ProfesionalEspecializado from "../models/profecionalEspecializado.js";

// Controlador para Especialidades ---------------------------------------------
export const crearEspecialidad = async (req, res) => {
  const especialidad = req.body;

  if (
    !especialidad.nombre ||
    !especialidad.descripcion ||
    especialidad.estado === undefined
  ) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    await Especialidad.crearEspecialidad(especialidad);
    res.status(201).json({ message: "Especialidad creada" });
  } catch (error) {
    console.error("Error al crear la especialidad:", error);
    res.status(500).json({ message: "Error al crear la especialidad." });
  }
};

export const obtenerEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.obtenerEspecialidades();
    res.json(especialidades);
  } catch (error) {
    console.error("Error al obtener especialidades:", error);
    res.status(500).json({ message: "Error al obtener especialidades." });
  }
};

export const actualizarEspecialidad = async (req, res) => {
  const id = req.params.id;
  const especialidad = req.body;

  try {
    const result = await Especialidad.actualizarEspecialidad(especialidad, id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "La especialidad no exisste" });
    }

    res.status(200).json({ message: "Especialidad actualizada " });
  } catch (error) {
    console.error("Error al actualizar la especialidad:", error);
    res.status(500).json({ message: "Error al actualizar la especialidad." });
  }
};

/*
export const desactivarEspecialidad = async (req, res) => {
  const id = req.params.id;

  try {
    await Especialidad.eliminarEspecialidad(id);
    res.status(200).json({ message: "Especialidad desactivada exitosamente" });
  } catch (error) {
    console.error("Error al desactivar la especialidad:", error);
    res.status(500).json({ message: "Error al desactivar la especialidad." });
  }
};
*/
/*
export const activarEspecialidad = async (req, res) => {
  const id = req.params.id;

  try {
    await Especialidad.activarEspecialidad(id);
    res.status(200).json({ message: "Especialidad activada exitosamente" });
  } catch (error) {
    console.error("Error al activar la especialidad:", error);
    res.status(500).json({ message: "Error al activar la especialidad." });
  }
};
*/

// Controlador para Profesionales -------------------------

export const crearProfesional = async (req, res) => {
  const profesional = req.body;

  if (
    !profesional.nombre ||
    !profesional.apellido ||
    profesional.estado === undefined
  ) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const result = await Profesional.crearProfesional(profesional);
    res.status(201).json({ message: "Profesional creado" });
  } catch (error) {
    console.error("Error al crear el profesional:", error);
    res.status(500).json({ message: "Error al crear el profesional." });
  }
};

export const actualizarProfesional = async (req, res) => {
  const id = req.params.id;
  const profesional = req.body;

  try {
    const result = await Profesional.actualizarProfesional(profesional, id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "El profesional no existe." });
    }

    res.status(200).json({ message: "Profesional actualizado" });
  } catch (error) {
    console.error("Error al actualizar el profesional:", error);
    res.status(500).json({ message: "Error al actualizar el profesional." });
  }
};

export const altaProfesional = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Profesional.altaProfesional(id);
    res.status(200).json({ message: "Profesional activado" });
  } catch (error) {
    console.error("Error al activar el profesional:", error);
    res.status(500).json({ message: "Error al activar el profesional." });
  }
};

export const bajaProfesional = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Profesional.bajaProfesional(id);
    res.status(200).json({ message: "Profesional desactivado" });
  } catch (error) {
    console.error("Error al desactivar el profesional:", error);
    res.status(500).json({ message: "Error al desactivar el profesional." });
  }
};

// Controlador para Profesionales Especializados ---------------------------

export const crearProfesionalEspecializado = async (req, res) => {
  const profesionalEspecializado = req.body;

  if (
    !profesionalEspecializado.idEspecialidad ||
    !profesionalEspecializado.idProfecional ||
    !profesionalEspecializado.matricula
  ) {
    return res.status(400).json({ message: "Faltan datos necesarios." });
  }

  try {
    const result = await ProfesionalEspecializado.crearProfesionalEspecializado(
      profesionalEspecializado
    );
    res.status(201).json({ message: "Profesional especializado creado " });
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
    res.json(profesionales);
  } catch (error) {
    console.error("Error al obtener profesionales especializados:", error);
    res
      .status(500)
      .json({ message: "Error al obtener profesionales especializados." });
  }
};

export const actualizarProfesionalEspecializado = async (req, res) => {
  const id = req.params.id;
  const profesionalEspecializado = req.body;

  try {
    const result =
      await ProfesionalEspecializado.actualizarProfesionalEspecializado(
        profesionalEspecializado,
        id
      );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "El profesional especializado no existe" });
    }

    res.status(200).json({ message: "Profesional especializado actualizado" });
  } catch (error) {
    console.error("Error al actualizar el profesional especializado:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar el profesional especializado." });
  }
};

//Borrado logico
export const eliminarProfesionalEspecializado = async (req, res) => {
  const id = req.params.id;

  try {
    const result =
      await ProfesionalEspecializado.eliminarProfesionalEspecializado(id);
    res.status(200).json({ message: "Profesional especializado eliminado" });
  } catch (error) {
    console.error("Error al eliminar el profesional especializado", error);
    res
      .status(500)
      .json({ message: "Error al eliminar el profesional especializado" });
  }
};
