import { conexion } from "../config/db.js";

// export const getCalendario = async (req, res) => {
//   try {
//     const [rows] = await conexion.query("SELECT * FROM calendario");
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener Calendarios: ", error);
//     res.status(500).json({
//       message: "Error al obtener los Calendarios",
//     });
//   }
// };

// export const getCalendarioId = async (req, res) => {
//   try {
//     const [rows] = await conexion.query(
//       "SELECT * FROM calendario WHERE idCalendario = ?",
//       [req.params.id]
//     );

//     if (rows.length === 0)
//       return res.status(404).json({
//         message: "El Calendario no exite",
//       });
//     res.json(rows[0]);
//   } catch (error) {
//     console.error("Error al obtener un Calendario: ", error);
//     res.status(500).json({
//       message: "Error al obtener un Calendario",
//     });
//   }
// };

// export const crearCalendario = async (req, res) => {
//   const calendario = req.body;

//   if (!calendario || !calendario.descripcion || !calendario.anio) {
//     return res.status(400).json({ message: "El dato es requerido" });
//   }

//   const query = `
//         INSERT INTO calendario (descripcion, diasNoLaborables, fechaInicio, fechaFin, anio,  estado)
//         VALUES (?, ?, ?, ?, ?, ?)
//     `;

//   const {
//     descripcion,
//     diasNoLaborables = null,
//     fechaInicio = null,
//     fechaFin = null,
//     anio,
//     estado = 1,
//   } = calendario;

//   const values = [
//     descripcion,
//     diasNoLaborables,
//     fechaInicio,
//     fechaFin,
//     anio,
//     estado,
//   ];

//   try {
//     const [result] = await conexion.execute(query, values);
//     const calendarioId = result.insertId;

//     res.status(201).json({
//       idCalendario: calendarioId,
//       descripcion,
//       diasNoLaborables,
//       fechaInicio,
//       fechaFin,
//       anio,
//       estado,
//     });
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     return res.status(500).json({
//       message: "Error al cargar una fecha en el Calendario",
//     });
//   }
// };

//No actualiza los valores a null verificar
// export const actualizarCalendario = async (req, res) => {
//   const id = req.params.id;
//   const calendario = req.body;
//   const {
//     descripcion,
//     diasNoLaborables = null,
//     fechaInicio = null,
//     fechaFin = null,
//     anio,
//   } = calendario;

//   const query =
//     "UPDATE calendario SET descripcion = IFNULL(?, descripcion), diasNoLaborables = IFNULL(?, diasNoLaborables), fechaInicio = IFNULL(?, fechaInicio), fechaFin = IFNULL(?, fechaFin), anio = IFNULL(?, anio) WHERE idCalendario = ?";

//   try {
//     const [result] = await conexion.execute(query, [
//       descripcion,
//       diasNoLaborables,
//       fechaInicio,
//       fechaFin,
//       anio,
//       id,
//     ]);

//     if (result.affectedRows === 0) {
//       return res
//         .status(404)
//         .json({ message: "La fecha no existe en el calendario" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Calendario actualizado exitosamente" });
//   } catch (error) {
//     console.error("Error al Actualizar");
//     return res.status(500).json({
//       message: "Error al actualizar Calendario",
//     });
//   }
// };

// export const bajaCalendario = async (req, res) => {
//   const id = req.params.id;

//   const query = "UPDATE calendario SET estado = 0 WHERE idCalendario =?";

//   try {
//     const [result] = await conexion.execute(query, [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "El calendario no se creo" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Calendario dado de BAJA exitosamente" });
//   } catch (error) {
//     console.error("Error con Calendario");
//     return res.status(500).json({
//       message: "Error al dar de BAJA el Calendario",
//     });
//   }
// };

// export const altaCalendario = async (req, res) => {
//   const id = req.params.id;

//   const query = "UPDATE calendario SET estado = 1 WHERE idCalendario = ?";

//   try {
//     const [result] = await conexion.execute(query, [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "El calendario NO esta creado" });
//     }

//     return res.status(200).json({ message: "Calendario en ALTA exitosamente" });
//   } catch (error) {
//     console.error("Error con Calendario");
//     return res.status(500).json({
//       message: "Error ALTA del Calendario",
//     });
//   }
// };
