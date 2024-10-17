import { conexion } from "../config/db.js";

// export const getEstadoHorario = async (req, res) => {
//   try {
//     const [rows] = await conexion.query("SELECT * FROM estadohorario");
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener los estados: ", error);
//     res.status(500).json({
//       message: "Error al obtener los Estados",
//     });
//   }
// };

// export const getEstadoHorarioId = async (req, res) => {
//   try {
//     const [rows] = await conexion.query(
//       "SELECT * FROM estadohorario WHERE idEstadoHorario = ?",
//       [req.params.id]
//     );

//     if (rows.length === 0)
//       return res.status(404).json({
//         message: "El Estado no exite",
//       });
//     res.json(rows[0]);
//   } catch (error) {
//     console.error("Error al obtener un Estado: ", error);
//     res.status(500).json({
//       message: "Error al obtener un Estado",
//     });
//   }
// };

// export const agregarEstadoHorario = async (req, res) => {
//   const { estado } = req.body;

//   if (!estado) {
//     return res.status(400).json({ message: "El dato es requerido" });
//   }

//   const query = `
//         INSERT INTO estadohorario (estado)
//         VALUES (?)
//     `;

//   try {
//     const [result] = await conexion.execute(query, [estado]);
//     const estadoId = result.insertId;

//     res.status(201).json({
//       idEstadoHorario: estadoId,
//       estado,
//     });
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     return res.status(500).json({
//       message: "Error al cargar en nuevo estado",
//     });
//   }
// };
