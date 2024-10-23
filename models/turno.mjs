import { conexion } from "../config/db.js";

class Turno {
  #fecha;
  #hora;
  #clasificacion;
  #idPaciente;
  #idAgenda;
  #idEmpleado;
  #idEstadoHorario;

  constructor(fecha, hora, clasificacion, idPaciente, idAgenda, idEmpleado, idEstadoHorario) {
    this.#fecha = fecha;
    this.#hora = hora;
    this.#clasificacion = clasificacion;
    this.#idPaciente = idPaciente;
    this.#idAgenda = idAgenda;
    this.#idEmpleado = idEmpleado;
    this.#idEstadoHorario = idEstadoHorario;
  }

  // Crear un turno
  static async crearTurno(data) {
    try {
      const query = `
        INSERT INTO turno (fecha, hora, clasificacion, idPaciente, idAgenda, idEmpleado, idEstadoHorario)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        data.fecha,
        data.hora,
        data.clasificacion,
        data.idPaciente,
        data.idAgenda,
        data.idEmpleado,
        data.idEstadoHorario,
      ];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un turno", error);
      throw error;
    }
  }

  // Crear un turno con valores nulos
  static async crearTurnoConNull(data) {
    try {
      const query = `
        INSERT INTO turno (fecha, hora, clasificacion, idPaciente, idAgenda, idEmpleado, idEstadoHorario)
        VALUES (NULL, ?, NULL, NULL, ?, NULL, ?)
      `;
      const values = [
        data.hora,
        data.idAgenda,
        data.idEstadoHorario,

      ];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un turno con valores nulos", error);
      throw error;
    }
  }

  // Modificar un turno
  static async modificarTurno(data, idTurno) {
    try {
      const query = `
        UPDATE turno 
        SET fecha = ?, hora = ?, clasificacion = ?, idPaciente = ?, idAgenda = ?, idEmpleado = ?, idEstadoHorario = ?
        WHERE idTurno = ?
      `;
      const values = [
        data.fecha,
        data.hora,
        data.clasificacion,
        data.idPaciente,
        data.idAgenda,
        data.idEmpleado,
        data.idEstadoHorario,
        idTurno,
      ];
      const [result] = await conexion.query(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al modificar un turno", error);
      throw error;
    }
  }

  // Cambiar el estado actual a cualquier otro
  static async cambiarEstado(estado, idTurno) {
    try {
      const query = `
        UPDATE turno 
        SET estado = ?
        WHERE idTurno = ?
      `;
      const [result] = await conexion.query(query, [estado, idTurno]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al cambiar el estado de un turno", error);
      throw error;
    }
  }

  // Cambiar el estado siempre a libre
  static async cambiarEstadoALibre(idTurno) {
    try {
      const query = `
        UPDATE turno 
        SET estado = '2'
        WHERE idTurno = ?
      `;
      const [result] = await conexion.query(query, [idTurno]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al cambiar el estado a libre", error);
      throw error;
    }
  }
}

export default Turno;

