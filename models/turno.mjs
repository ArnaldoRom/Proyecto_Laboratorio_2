import { conexion } from "../config/db.js";

class Turno {
  #fecha;
  #hora;
  #clasificacion;
  #idPaciente;
  #idAgenda;
  #idEmpleado;
  #idEstadoHorario;

  constructor(
    fecha,
    hora,
    clasificacion,
    idPaciente,
    idAgenda,
    idEmpleado,
    idEstadoHorario
  ) {
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
      const values = [data.hora, data.idAgenda, data.idEstadoHorario];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un turno con valores nulos", error);
      throw error;
    }
  }

  // Modificar un turno
  static async modificarTurno(data) {
    try {
      const query = `
      UPDATE turno 
      SET fecha = ?, clasificacion = ?, idPaciente = ?, idEmpleado = ?, idEstadoHorario = 3 WHERE idTurno = ?
      `;
      const values = [
        data.fecha,
        data.clasificacion,
        data.idPaciente,
        data.idEmpleado,
        data.idTurno,
      ];
      const [result] = await conexion.query(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al modificar un turno", error);
      throw error;
    }
  }

  // Cambiar el estado actual a cualquier otro
  static async cambiarEstado(data) {
    try {
      const query = `
        UPDATE turno 
        SET idEstadoHorario = ?
        WHERE idTurno = ?
      `;

      const values = [data.idEstadoHorario, data.idTurno];
      const [result] = await conexion.query(query, values);
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

  static async asignarPaciente(idPaciente, idTurno) {
    try {
      const query = `
        UPDATE turno 
        SET idPaciente = ?
        WHERE idTurno = ?
      `;

      const values = [idPaciente, idTurno];
      const [result] = await conexion.query(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al agregar paciente al turno", error);
      throw error;
    }
  }

  static async getTurno() {
    try {
      const [rows] = await conexion.query("SELECT * FROM turno");
      return rows;
    } catch (error) {
      console.error("Error al obtener Sucursal", error);
      throw error;
    }
  }

  static async getTurnoId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM turno WHERE idTurno = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al recuperar Turno");
      throw error;
    }
  }

  static async turnosReservadosPorHora(hora, idAgenda) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM turno WHERE hora = ? AND idAgenda = ?",
        [hora, idAgenda]
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener Pacientes de la lista", error);
      throw error;
    }
  }

  static async turnosReservadosPorAgenda(idAgenda) {
    try {
      const query =
        "SELECT * FROM turno WHERE idAgenda = ? AND idEstadoHorario = 2";
      const [rows] = await conexion.query(query, [idAgenda]);
      return rows;
    } catch (error) {
      console.error("Error al verificar turnos de la agenda", error);
      throw error;
    }
  }
}

export default Turno;
