import { conexion } from "../config/db.js";

export const getPacientes = async (req, res) => {
  try {
    const [rows] = await conexion.query("SELECT * FROM paciente");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Pacientes: ", error);
    res.status(500).json({
      message: "Error al obtener los Pacientes",
    });
  }
};

export const getPacienteId = async (req, res) => {
  try {
    const [rows] = await conexion.query(
      "SELECT * FROM paciente WHERE idPaciente = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({
        message: "El Paciente no exite",
      });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el paciente: ", error);
    res.status(500).json({
      message: "Error al obtener el paciente",
    });
  }
};

export const crearPaciente = async (req, res) => {
  const paciente = req.body;

  if (
    !paciente ||
    !paciente.nombre ||
    !paciente.apellido ||
    !paciente.DNI ||
    !paciente.obraSocial ||
    !paciente.datosContacto
  ) {
    return res.status(400).json({ message: "Todos los datos son requeridos" });
  }

  const query = `
        INSERT INTO paciente (nombre, apellido, DNI, motivoConsulta, obraSocial, datosContacto, idUsuario, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const {
    nombre,
    apellido,
    DNI,
    motivoConsulta = null,
    obraSocial,
    datosContacto,
    idUsuario = null,
    estado = 1,
  } = paciente;

  const values = [
    nombre,
    apellido,
    DNI,
    motivoConsulta,
    obraSocial,
    datosContacto,
    idUsuario,
    estado,
  ];

  try {
    const [result] = await conexion.execute(query, values);
    const pacienteId = result.insertId;

    res.status(201).json({
      idPaciente: pacienteId,
      nombre,
      apellido,
      DNI,
      motivoConsulta,
      obraSocial,
      datosContacto,
      idUsuario,
      estado,
    });
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    return res.status(500).json({
      message: "Error al registrar el paciente",
    });
  }
};

export const actualizarPaciente = async (req, res) => {
  const id = req.params.id;
  const paciente = req.body;
  const {
    nombre,
    apellido,
    DNI,
    motivoConsulta = null,
    obraSocial,
    datosContacto,
    idUsuario = null,
  } = paciente;

  const query =
    "UPDATE paciente SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), DNI = IFNULL(?, DNI), motivoConsulta = IFNULL(?, motivoConsulta), obraSocial = IFNULL(?, obraSocial), datosContacto = IFNULL(?, datosContacto), idUsuario = IFNULL(?, idUsuario) WHERE idPaciente = ?";

  try {
    const [result] = await conexion.execute(query, [
      nombre,
      apellido,
      DNI,
      motivoConsulta,
      obraSocial,
      datosContacto,
      idUsuario,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "El paciente no existe" });
    }

    return res
      .status(200)
      .json({ message: "Paciente actualizado exitosamente" });
  } catch (error) {
    console.error("Error al Actualizar");
    return res.status(500).json({
      message: "Error al actualizar el paciente",
    });
  }
};

export const bajaPaciente = async (req, res) => {
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

export const altaPaciente = async (req, res) => {
  const id = req.params.id;

  const query = "UPDATE paciente SET estado = 1 WHERE idPaciente = ?";

  try {
    const [result] = await conexion.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "El paciente no existe" });
    }

    return res
      .status(200)
      .json({ message: "Paciente dado de ALTA exitosamente" });
  } catch (error) {
    console.error("Error con paciente");
    return res.status(500).json({
      message: "Error a la ALTA del paciente",
    });
  }
};
