import { conexion } from "../config/db.js";

class Paciente {
  #nombre;
  #apellido;
  #dni;
  #motivoConsulta;
  #obraSocial;
  #datoContacto;
  #idUsuario;
  #estado;

  constructor(
    nombre,
    apellido,
    dni,
    motivoConsulta,
    obraSocial,
    datoContacto,
    idUsuario,
    estado
  ) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#dni = dni;
    this.#motivoConsulta = motivoConsulta;
    this.#obraSocial = obraSocial;
    this.#datoContacto = datoContacto;
    this.#idUsuario = idUsuario;
    this.#estado = estado;
  }

  static async getPaciente() {
    try {
      const [rows] = await conexion.query("SELECT * FROM paciente");
      return rows;
    } catch (error) {
      console.error("Error al obtener Pacientes", error);
      throw error;
    }
  }

  static async getPacienteId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM paciente WHERE idPaciente = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error al recuperar Paciente");
      throw error;
    }
  }

  static async cargarPaciente(data) {
    try {
      const query = `
        INSERT INTO paciente (nombre, apellido, DNI, obraSocial, datosContacto, idUsuario, estado)
        VALUES (?, ?, ?, ?, ?, ?, 1)
    `;

      const values = [
        data.nombre,
        data.apellido,
        data.DNI,
        data.obraSocial,
        data.datosContacto || null,
        data.idUsuario || null,
      ];

      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al cargar Paciente", error);
      throw error;
    }
  }

  static async actualizarPaciente(data, id) {
    try {
      const query =
        "UPDATE paciente SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), DNI = IFNULL(?, DNI), motivoConsulta = IFNULL(?, motivoConsulta), obraSocial = IFNULL(?, obraSocial), datosContacto = IFNULL(?, datosContacto), idUsuario = IFNULL(?, idUsuario) WHERE idPaciente = ?";

      const values = [
        data.nombre,
        data.apellido,
        data.DNI,
        data.motivoConsulta,
        data.obraSocial,
        data.datosContacto,
        data.idUsuario,
        id,
      ];

      const [rows] = await conexion.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error al Actualizar datos del Paciente");
      throw error;
    }
  }

  static async bajaPaciente(id) {
    try {
      const [rows] = await conexion.query(
        "UPDATE paciente SET estado = 0 WHERE idPaciente = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al dar de baja Paciente");
      throw error;
    }
  }

  static async altaPaciente(id) {
    try {
      const [rows] = await conexion.query(
        "UPDATE paciente SET estado = 1 WHERE idPaciente = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al dar de alta Paciente");
      throw error;
    }
  }
}

export default Paciente;
