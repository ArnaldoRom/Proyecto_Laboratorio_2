import { conexion } from "../config/db.js";

export const getListaEpera = async (req, res) => {
  try {
    const [rows] = await conexion.query("SELECT * FROM listaEspera");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Lista de Espera: ", error);
    res.status(500).json({
      message: "Error al obtener Lista de Espera",
    });
  }
};

export const getListaEperaId = async (req, res) => {
  try {
    const [rows] = await conexion.query(
      "SELECT * FROM listaEspera WHERE idListaEspera = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({
        message: "La lista de espera no exite",
      });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener Lista de Espera: ", error);
    res.status(500).json({
      message: "Error al obtener Lista de Espera",
    });
  }
};

export const añadirListaEspera = async (req, res) => {
  const listaEspera = req.body;

  if (!listaEspera || !listaEspera.idPaciente) {
    return res.status(400).json({ message: "Todos los datos son requeridos" });
  }

  const query = `
        INSERT INTO listaEspera (idPaciente)
        VALUES (?)
    `;

  const { idPaciente = null } = listaEspera;

  const values = [idPaciente];

  try {
    const [result] = await conexion.execute(query, values);
    const listaEsperaId = result.insertId;

    res.status(201).json({
      idListaEspera: listaEsperaId,
      idPaciente,
    });
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    return res.status(500).json({
      message: "Error al registrar el paciente en Lista de Espera",
    });
  }
};

export const actualizarListaEspera = async (req, res) => {
  const id = req.params.id;

  const query = "UPDATE paciente SET estado = 0 WHERE idPaciente = ?";

  try {
    const [result] = await conexion.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "El paciente no existe" });
    }

    return res
      .status(200)
      .json({ message: "Paciente dado de baja exitosamente" });
  } catch (error) {
    console.error("Error al Borrar paciente");
    return res.status(500).json({
      message: "Error al Borrar el paciente",
    });
  }
};
