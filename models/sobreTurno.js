import { conexion } from "../config/db.js";

class SobreTurno {
  #hora;
  #idPaciente;
  #idAgenda;

  constructor(hora, idPaciente, idAgenda) {
    this.#hora = hora;
    this.#idPaciente = idPaciente;
    this.#idAgenda = idAgenda;
  }

  static async getlistaSobreTurnos() {
    try {
      const [rows] = await conexion.query("SELECT * FROM sobreturno");
      return rows;
    } catch (error) {
      console.error("Error al obtener Pacientes de la lista", error);
      throw error;
    }
  }

  static async crearSobreTurno(data) {
    const { hora = null, idPaciente = null, idAgenda } = data;
    try {
      const query = `
        INSERT INTO sobreturno (hora, idPaciente, idAgenda)
        VALUES (?, ?, ?)
    `;

      const values = [hora, idPaciente, idAgenda];

      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear Sobre turno", error);
      throw error;
    }
  }

  static async agregarPaciente(hora, id) {
    try {
      const [result] = await conexion.query(
        `
       UPDATE sobreturno SET hora = ?, idPaciente = ?`,
        [hora, id]
      );
      return result.insertId;
    } catch (error) {
      console.error(
        "Error al agregar un Paciente a la Lista de Sobre Turnos",
        error
      );
      throw error;
    }
  }

  static async sacarPaciente(idSobreTurno) {
    try {
      const query = "DELETE FROM sobreturno WHERE idSobreTurno = ? ";
      const [result] = await conexion.query(query, [idSobreTurno]);
      return result;
    } catch (error) {
      console.error(
        "Error al Borrar paciente de la lista de sobre turno",
        error
      );
      throw error;
    }
  }
}

export default SobreTurno;
