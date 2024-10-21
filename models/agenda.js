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
    try {
      const query =
        "INSERT INTO agenda (dia, duracionHorario, hora_inicio, hora_Fin, limiteTurno, idProfesionalEspecializado, idSucursal, idCalendario, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

      const values = [
        data.dia,
        data.duracionHorario,
        data.hora_inicio,
        data.hora_fin,
        data.limiteTurno,
        data.idProfecionalEspecializado,
        data.idSucursal,
        data.idCalendario,
        data.estado,
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
        "SELECT * FROM agenda JOIN profecionalespecializado ON agenda.idProfesionalEspecializado = profecionalespecializado.idProfesionalEspecializado JOIN especialidad ON profecionalespecializado.idEspecialidad = especialidad.idEspecialidad WHERE nombre = ?";

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
        "SELECT * FROM agenda JOIN profecionalespecializado ON agenda.idProfesionalEspecializado = profecionalespecializado.idProfesionalEspecializado JOIN profesional ON profecionalespecializado.idProfesional = profesional.idProfesional WHERE profesional.nombre = ?";

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
    const [horas, minutos] = hora.split(":").map(Number);

    const fecha = new Date();
    fecha.setHours(horas);
    fecha.setMinutes(minutos);

    fecha.setMinutes(fecha.getMinutes() + duracion);

    const nuevaHora = `${String(fecha.getHours()).padStart(2, "0")}:${String(
      fecha.getMinutes()
    ).padStart(2, "0")}`;

    return nuevaHora;
  }
}

export default Agenda;
