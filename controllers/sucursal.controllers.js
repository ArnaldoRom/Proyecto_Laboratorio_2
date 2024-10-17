import { conexion } from "../config/db.js";

// export const getSucursal = async (req, res) => {
//   try {
//     const [rows] = await conexion.query("SELECT * FROM sucursal");
//     res.json(rows);
//   } catch (error) {
//     console.error("Error al obtener Sucursal: ", error);
//     res.status(500).json({
//       message: "Error al obtener las Sucursales",
//     });
//   }
// };

// export const getSucursalId = async (req, res) => {
//   try {
//     const [rows] = await conexion.query(
//       "SELECT * FROM sucursal WHERE idSucursal = ?",
//       [req.params.id]
//     );

//     if (rows.length === 0)
//       return res.status(404).json({
//         message: "La Sucursal no exite",
//       });
//     res.json(rows[0]);
//   } catch (error) {
//     console.error("Error al obtener la Sucursal: ", error);
//     res.status(500).json({
//       message: "Error al obtener la Scursal",
//     });
//   }
// };

// export const cargarSucursal = async (req, res) => {
//   const sucursal = req.body;

//   if (
//     !sucursal ||
//     !sucursal.nombre ||
//     !sucursal.direccion ||
//     !sucursal.clasificacion
//   ) {
//     return res.status(400).json({ message: "Todos los datos son requeridos" });
//   }

//   const query = `
//         INSERT INTO sucursal (nombre, direccion, clasificacion, estado)        VALUES (?, ?, ?, ?,) `;
//   const { nombre, direccion, clasificacion, estado = 1 } = sucursal;
//   const values = [nombre, direccion, clasificacion, estado];

//   try {
//     const [result] = await conexion.execute(query, values);
//     const sucursalId = result.insertId;

//     res.status(201).json({
//       idSucursal: sucursalId,
//       nombre,
//       direccion,
//       clasificacion,
//       estado,
//     });
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     return res.status(500).json({
//       message: "Error al registrar una Sucursal",
//     });
//   }
// };

// export const actualizarSucursal = async (req, res) => {
//   const id = req.params.id;
//   const sucursal = req.body;
//   const { nombre, direccion, clasificacion } = sucursal;

//   const query =
//     "UPDATE sucursal SET nombre = IFNULL(?, nombre), direccion = IFNULL(?, direccion), clasificacion = IFNULL(?, clasificacion) WHERE idSucursal = ?";

//   try {
//     const [result] = await conexion.execute(query, [
//       nombre,
//       direccion,
//       clasificacion,
//       id,
//     ]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "La Sucursal no existe" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Sucursal actualizada exitosamente" });
//   } catch (error) {
//     console.error("Error al Actualizar");
//     return res.status(500).json({
//       message: "Error al actualizar datos de la Sucursal",
//     });
//   }
// };

// export const bajaSucursal = async (req, res) => {
//   const id = req.params.id;

//   const query = "UPDATE sucursal SET estado = 0 WHERE idSucursal = ?";

//   try {
//     const [result] = await conexion.execute(query, [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "La Sucursal no existe" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Sucursal Deshabilidata exitosamente" });
//   } catch (error) {
//     console.error("Error con Saucursal");
//     return res.status(500).json({
//       message: "Error a habilitacion de la sucursal",
//     });
//   }
// };

// export const altaSucursal = async (req, res) => {
//   const id = req.params.id;

//   const query = "UPDATE sucursal SET estado = 1 WHERE idSucursal = ?";

//   try {
//     const [result] = await conexion.execute(query, [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "La Sucursal no existe" });
//     }

//     return res
//       .status(200)
//       .json({ message: "Sucursal Habilitada exitosamente" });
//   } catch (error) {
//     console.error("Error con Saucursal");
//     return res.status(500).json({
//       message: "Error a habilitacion de la sucursal",
//     });
//   }
// };
