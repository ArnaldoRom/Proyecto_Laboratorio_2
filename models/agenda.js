import { conexion } from "../config/db.js";

class Agenda {
  #dia;
  #duracionHorario;
  #hora_inicio;
  #hora_fin;
  #limiteTurno;
  #idProfesionalEspecializado;
  #idSucursal;
  #idCalendario;
  #estado;

  constructor(
    dia,
    duracionHorario,
    hora_inicio,
    hora_fin,
    limiteTurno,
    idProfecionalEspecializado,
    idSucursal,
    idCalendario,
    estado
  ) {
    this.#dia = dia;
    this.#duracionHorario = duracionHorario;
    this.#hora_inicio = hora_inicio;
    this.#hora_fin = hora_fin;
    this.#limiteTurno = limiteTurno;
    this.#idProfesionalEspecializado = idProfecionalEspecializado;
    this.#idSucursal = idSucursal;
    this.#idCalendario = idCalendario;
    this.#estado = estado;
  }

  static async getAgenda() {
    try {
      const [rows] = await conexion.query("SELECT * FROM agenda");
      return rows;
    } catch (error) {
      console.error("Error al obtener Agenda", error);
      throw error;
    }
  }

  static async getAgendaId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM agenda WHERE idAgenda = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al recuperar Agenda por Id");
      throw error;
    }
  }

  static async agregarAgenda(data) {
    const {
      dia,
      duacionHorario,
      hora_inicio,
      hora_Fin,
      limiteTurno,
      idProfesionalEspecializado,
      idSucursal,
      idCalendario,
      estado = 1,
    } = data;
    try {
      const query =
        "INSERT INTO agenda (dia, duacionHorario, hora_inicio, hora_Fin, limiteTurno, idProfesionalEspecializado, idSucursal, idCalendario, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

      const values = [
        dia,
        duacionHorario,
        hora_inicio,
        hora_Fin,
        limiteTurno,
        idProfesionalEspecializado,
        idSucursal,
        idCalendario,
        estado,
      ];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al agregar una Agenda", error);
      throw error;
    }
  }

  static async porEspecialidad(nombre) {
    try {
      const query =
        "SELECT * FROM agenda JOIN profecionalespecializado ON agenda.idProfesionalEspecializado = profecionalespecializado.idProfesionalEspecializado JOIN especialidad ON profecionalespecializado.idEspecialidad = especialidad.idEspecialidad WHERE nombreEsp = ?";

      const [rows] = await conexion.query(query, [nombre]);
      return rows;
    } catch (error) {
      console.error("Error al obtener Agenda por Especialidad", error);
      throw error;
    }
  }

  static async porProfecional(nombre) {
    try {
      const query =
        "SELECT * FROM agenda JOIN profecionalespecializado ON agenda.idProfesionalEspecializado = profecionalespecializado.idProfesionalEspecializado JOIN profesional ON profecionalespecializado.idProfesional = profesional.idProfesional JOIN especialidad on especialidad.idEspecialidad = profecionalespecializado.idEspecialidad WHERE profesional.nombrePro = ?";

      const [rows] = await conexion.query(query, [nombre]);
      return rows;
    } catch (error) {
      console.error("Error al obtender Agenda por Profecional");
      throw error;
    }
  }

  static async porEstadoTurno(estado = "Libre") {
    try {
      const query =
        "SELECT * FROM agenda INNER JOIN turno ON agenda.idAgenda = turno.idAgenda INNER JOIN estadohorario ON turno.idEstadoHorario = estadohorario.idEstadoHorario WHERE estadohorario.estado = ?";

      const [rows] = await conexion.query(query, [estado]);
      return rows;
    } catch (error) {
      console.error("Error al obtener turno por estado");
      throw error;
    }
  }

  static crearIntervalosTurno(hora, duracion) {
    const nuevaHora = new Date(hora);

    nuevaHora.setMinutes(nuevaHora.getMinutes() + duracion);

    return nuevaHora;
  }

  static async porClasificacion(clasificacion) {
    try {
      const query =
        "SELECT turno.fecha, turno.clasificacion, turno.hora, turno.idPaciente FROM agenda INNER JOIN turno ON turno.idAgenda = agenda.idAgenda WHERE turno.clasificacion = ?";
      console.log(clasificacion);
      const [rows] = await conexion.query(query, [clasificacion]);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error("Error al obtener por clasificacion");
      throw error;
    }
  }

  static async limiteSobreTurno(idAgenda) {
    try {
      const [rows] = await conexion.query(
        "SELECT limiteTurno FROM agenda WHERE idAgenda = ?",
        [idAgenda]
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener Pacientes de la lista", error);
      throw error;
    }
  }
}

export default Agenda;
