import { conexion } from "../config/db.js";

class Calendario {
  #idCalendario;
  #descripcion;
  #diasNoLaborables;
  #fechaInicio;
  #fechaFin;
  #estado;

  constructor(
    idCalendario,
    descripcion,
    diasNoLaborables,
    fechaInicio,
    fechaFin,
    estado
  ) {
    this.#idCalendario = idCalendario;
    this.#descripcion = descripcion;
    this.#diasNoLaborables = diasNoLaborables;
    this.#fechaInicio = fechaInicio;
    this.#fechaFin = fechaFin;
    this.#estado = estado;
  }

  static async getCalendario() {
    try {
      const [rows] = await conexion.query("SELECT * FROM calendario");
      return rows;
    } catch (error) {
      console.error("Error al obtener Calendario", error);
      throw error;
    }
  }

  static async getCalendarioId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM calendario WHERE idCalendario = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al recuperar Calendariopor Id");
      throw error;
    }
  }

  static async crearCalendario(data) {
    const {
      descripcion,
      diasNoLaborables = null,
      fechaInicio = null,
      fechaFin = null,
    } = data;
    try {
      const query = `
        INSERT INTO calendario (descripcion, diasNoLaborables, fechaInicio, fechaFin, estado)
        VALUES (?, ?, ?, ?, 1)
    `;

      const values = [descripcion, diasNoLaborables, fechaInicio, fechaFin];

      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al agregar un Calendario", error);
      throw error;
    }
  }

  static async actualizarCalendario(data, id) {
    try {
      const {
        descripcion,
        diasNoLaborables = null,
        fechaInicio = null,
        fechaFin = null,
      } = data;

      const query =
        "UPDATE calendario SET descripcion = IFNULL(?, descripcion), diasNoLaborables = IFNULL(?, diasNoLaborables), fechaInicio = IFNULL(?, fechaInicio), fechaFin = IFNULL(?, fechaFin), WHERE idCalendario = ?";

      const values = [descripcion, diasNoLaborables, fechaInicio, fechaFin, id];
      const [rows] = await conexion.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error al Actualizar Calendario");
      throw error;
    }
  }

  static async bajaCalendario(id) {
    try {
      const [rows] = await conexion.query(
        "UPDATE calendario SET estado = 0 WHERE idCalendario =?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al dar de baja Calendario");
      throw error;
    }
  }

  static async altaCalendario(id) {
    try {
      const [rows] = await conexion.query(
        "UPDATE calendario SET estado = 1 WHERE idCalendario =?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al dar de alta Calendario");
      throw error;
    }
  }
}

export default Calendario;
