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

  static async agregarPaciente(id) {
    try {
      const [result] = await conexion.query(
        `
        INSERT INTO sobreturno (idPaciente)
        VALUES (?)
    `,
        [id]
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

  static async sacarPaciente(idPaciente, idAgenda) {
    try {
      const query =
        "DELETE FROM sobreturno WHERE IDPaciente = ? AND IDAgenda = ?";
      const [result] = await conexion.query(query, [idPaciente, idAgenda]);
      return result;
    } catch (error) {
      console.error(
        "Error al Borrar paciente de la lista de sobre turno",
        error
      );
      throw error;
    }
  }

  static async primerPaciente(idAgenda) {
    try {
      const [rows] = await conexion.query(
        "SELECT IDSobreTurno, hora, IDPaciente, IDAgenda FROM sobreturno WHERE IDAgenda = ? ORDER BY IDSobreTurno ASC LIMIT 1;",
        [idAgenda]
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener Paciente: ", error);
      throw error;
    }
  }
}

export default SobreTurno;
