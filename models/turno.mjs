import { conexion } from "../config/db.js";

class Turno {
  #diaTurno;
  #hora;
  #clasificacion;
  #idPaciente;
  #motivoConsulta;
  #idAgenda;
  #idEstadoHorario;

  constructor(
    diaTurno,
    hora,
    clasificacion,
    idPaciente,
    motivoConsulta,
    idAgenda,
    idEstadoHorario
  ) {
    this.#diaTurno = diaTurno;
    this.#hora = hora;
    this.#clasificacion = clasificacion;
    this.#idPaciente = idPaciente;
    this.#idAgenda = idAgenda;
    this.#motivoConsulta = motivoConsulta;
    this.#idEstadoHorario = idEstadoHorario;
  }

  // Crear un turno
  static async crearTurno(data) {
    try {
      const query = `
        INSERT INTO turno (diaTurno, hora, clasificacion, idPaciente, idAgenda, motivoConsulta, idEstadoHorario)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        data.diaTurno,
        data.hora,
        data.clasificacion,
        data.idPaciente,
        data.motivoConsulta,
        data.idAgenda,
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
        INSERT INTO turno (diaTurno, hora, clasificacion, idPaciente, motivoConsulta, idAgenda, idEstadoHorario)
        VALUES (?, ?, NULL, NULL, NULL, ?, ?)
      `;
      const values = [
        data.diaTurno,
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
  static async modificarTurno(data) {
    try {
      const query = `
      UPDATE turno 
      SET clasificacion = ?, idPaciente = ?, motivoConsulta = ?, idEstadoHorario = 4 WHERE idTurno = ?
      `;
      const values = [
        data.clasificacion || null,
        data.idPaciente,
        data.motivoConsulta || null,
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
        SET estado = '2', idPaciente = 
        WHERE idTurno = ?
      `;
      const [result] = await conexion.query(query, [idTurno]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al cambiar el estado a libre", error);
      throw error;
    }
  }

  // Cambiar el estado siempre a reservado
  static async cambiarEstadoAReservado(idTurno, idPaciente) {
    try {
      const query = `
        UPDATE turno 
        SET idEstadoHorario = 3, idPaciente = ?
        WHERE idTurno = ?
      `;
      const [result] = await conexion.query(query, [idPaciente, idTurno]);
      return result.affectedRows;
    } catch (error) {
      console.error(
        "Error al cambiar el estado a reservado y asignar el paciente",
        error
      );
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
      console.error("Error al obtener Turnos", error);
      throw error;
    }
  }

  static async getTurnoId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM turno t JOIN paciente p ON p.idPaciente = t.idPaciente JOIN agenda a ON a.idAgenda = t.idAgenda JOIN profecionalespecializado pf ON pf.idProfesionalEspecializado = a.idProfesionalEspecializado JOIN profesional pro ON pro.idProfesional = pf.idEspecialidad WHERE idTurno = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al recuperar Turno");
      throw error;
    }
  }

  static async getTurnoPorAgenda(idAgenda) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM turno LEFT JOIN paciente ON paciente.idPaciente = turno.idPaciente WHERE idAgenda = ?",
        [idAgenda]
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener Turnos");
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

  static async turnosConfirmadosPorAgenda(idAgenda) {
    try {
      const query =
        "SELECT * FROM turno JOIN paciente on paciente.idPaciente = turno.idPaciente WHERE idAgenda = ? AND idEstadoHorario = 4";
      const [rows] = await conexion.query(query, [idAgenda]);
      return rows;
    } catch (error) {
      console.error("Error al verificar turnos de la agenda", error);
      throw error;
    }
  }
}

export default Turno;
