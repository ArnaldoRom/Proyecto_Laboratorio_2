import { conexion } from "../config/db.js";

export async function getPacientes(req, res) {
  try {
    const [rows] = await conexion.query("SELECT * FROM paciente");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener Pacientes: ", error);
    res.status(500).json({
      message: "Error al obtener los Pacientes",
    });
  }
}

export const getPacienteId = async (req, res) => {
  const [rows] = await conexion.query(
    "SELECT * FROM paciente WHERE idPaciente = ?",
    [req.params.id]
  );

  if (rows.length === 0)
    return res.status(404).json({
      message: "El Paciente no exite",
    });
  res.json(rows[0]);
};

export const crearPaciente = async (req, res) => {
  const paciente = req.body;

  console.log(paciente);
  if (!paciente) {
    return res
      .status(400)
      .json({ message: "El paciente no puede ser null o undefined" });
  }

  const query = `
        INSERT INTO paciente (nombre, apellido, DNI, motivoConsulta, obraSocial, datosContacto, idUsuario, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const {
    nombre,
    apellido,
    DNI,
    motivoConsulta,
    obraSocial,
    datosContacto,
    idUsuario,
    estado,
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
    const pacienteGuardado = await getPacienteId;

    return pacienteGuardado;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw new Error("Error al guardar el paciente en la base de datos");
  }
};

export const actualizarPaciente = (req, res) => res.send("Creando Paciente");

export const borrarPaciente = (req, res) => res.send("Creando Paciente");
