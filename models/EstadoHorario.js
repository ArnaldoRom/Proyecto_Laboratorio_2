import { conexion } from "../config/db.js";

class EstadoHorario {
  #estado;

  constructor(estado) {
    this.#estado = estado;
  }

  static async getEstadoHorario() {
    try {
      const [rows] = await conexion.query("SELECT * FROM estadohorario");
      return rows;
    } catch (error) {
      console.error("Error al obtener los Estados", error);
      throw error;
    }
  }

  static async getEstafoHorarioId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM estadohorario WHERE idEstadoHorario = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error al recuperar Estado");
      throw error;
    }
  }

  static async agregarEstadoHorario(estado) {
    try {
      const query = `
        INSERT INTO estadohorario (estado)
        VALUES (?)
    `;

      const [result] = await conexion.query(query, [estado]);
      return result.insertId;
    } catch (error) {
      console.error("Error al agregar un Estado", error);
      throw error;
    }
  }
}

export default EstadoHorario;
