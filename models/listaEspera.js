import { conexion } from "../config/db.js";

class ListaEspera {
  #idPaciente;
  #idTurno;
  #idAgenda;

  constructor(idPaciente, idTurno, idAgenda) {
    this.#idPaciente = idPaciente;
    this.#idTurno = idTurno;
    this.#idAgenda = idAgenda;
  }

  static async getListaEspera() {
    try {
      const [rows] = await conexion.query("SELECT * FROM listaespera");
      return rows;
    } catch (error) {
      console.error("Error al obtener Lista de Espera", error);
      throw error;
    }
  }

  static async getListaEsperaId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM listaespera WHERE idListaEspera = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error al recuperar Paciente de Lista de Espera");
      throw error;
    }
  }

  static async agregarListaEspera(paciente, agenda) {
    try {
      const [result] = await conexion.query(
        `
        INSERT INTO listaEspera (idPaciente, idAgenda)
        VALUES (?, ?)
    `,
        [paciente, agenda]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error al agregar un Paciente a la Lista de Espera", error);
      throw error;
    }
  }

  static async sacarPacienteDeListaEspera(idPaciente, idAgenda) {
    try {
      const query =
        "DELETE FROM listaespera WHERE IDPaciente = ? AND IDAgenda = ?";
      const [result] = await conexion.query(query, [idPaciente, idAgenda]);
      return result;
    } catch (error) {
      console.error("Error al Borrar paciente de la lista de espera", error);
      throw error;
    }
  }

  static async primerPaciente(idAgenda) {
    try {
      const [rows] = await conexion.query(
        "SELECT IDListaEspera, IDPaciente, IDAgenda FROM listaespera WHERE IDAgenda = ? ORDER BY IDListaEspera ASC LIMIT 1;",
        [idAgenda]
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener Paciente: ", error);
      throw error;
    }
  }
}

export default ListaEspera;
