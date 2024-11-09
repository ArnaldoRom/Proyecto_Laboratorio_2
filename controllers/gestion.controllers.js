import Calendario from "../models/Calendario.mjs";
import Sucursal from "../models/sucursal.js";

export const agregarSucursal = async (req, res) => {
  const sucursal = req.body;

  if (!sucursal.nombre || !sucursal.direccion || !sucursal.clasificacion) {
    return res.status(400).json({ message: "Faltan datos necesarios." });
  }

  try {
    const nuevaSucursal = await Sucursal.cargarSucursal(sucursal);

    res.status(201).json({ Sucursal: nuevaSucursal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la agenda y los turnos." });
  }
};

export const getSucursal = async (req, res) => {
  try {
    const rows = await Sucursal.getSucursal();
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Sucursal: ", error);
    res.status(500).json({
      message: "Error al obtener las Sucursales",
    });
  }
};

export const getSucursalId = async (req, res) => {
  try {
    const rows = await Sucursal.getSucursalId(req.params.id);

    if (rows.length === 0)
      return res.status(404).json({
        message: "La Sucursal no exite",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener la Sucursal: ", error);
    res.status(500).json({
      message: "Error al obtener la Scursal",
    });
  }
};

export const agregarCalendario = async (req, res) => {
  const calendario = req.body;

  console.log(calendario);

  if (!calendario || !calendario.descripcion) {
    return res.status(400).json({ message: "El dato es requerido" });
  }

  try {
    const nuevoFecha = await Calendario.crearCalendario(calendario);

    res.status(201).json({ Calendario: nuevoFecha });
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    return res.status(500).json({
      message: "Error al cargar una fecha en el Calendario",
    });
  }
};

export const getCalendario = async (req, res) => {
  try {
    const rows = await Calendario.getCalendario();
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Calendarios: ", error);
    res.status(500).json({
      message: "Error al obtener los Calendarios",
    });
  }
};

export const getCalendarioId = async (req, res) => {
  try {
    const rows = await Calendario.getCalendarioId(req.params.id);

    if (rows.length === 0)
      return res.status(404).json({
        message: "El Calendario no exite",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener un Calendario: ", error);
    res.status(500).json({
      message: "Error al obtener un Calendario",
    });
  }
};

export const actualizarCalendario = async (req, res) => {
  const id = req.params.id;
  const calendario = req.body;
  try {
    const result = await Calendario.actualizarCalendario(calendario, id);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "La fecha no existe en el calendario" });
    }

    return res
      .status(200)
      .json({ message: "Calendario actualizado exitosamente" });
  } catch (error) {
    console.error("Error al Actualizar");
    return res.status(500).json({
      message: "Error al actualizar Calendario",
    });
  }
};
