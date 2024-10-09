class Agenda {
  #dia;
  #hora_inicio;
  #hora_fin;
  #clasificacion;
  #limiteTurno;
  #idProfesional;
  #idSucursal;
  #idEspecialidad;
  #idEstadoHorario;
  #estado;

  constructor(
    dia,
    hora_inicio,
    hora_fin,
    clasificacion,
    limiteTurno,
    idProfecional,
    idSucursal,
    idEspecialidad,
    idEstadoHorario,
    estado
  ) {
    this.#dia = dia;
    this.#hora_inicio = hora_inicio;
    this.#hora_fin = hora_fin;
    this.#clasificacion = clasificacion;
    this.#limiteTurno = limiteTurno;
    this.#idProfesional = idProfecional;
    this.#idSucursal = idSucursal;
    this.#idEspecialidad = idEspecialidad;
    this.#idEstadoHorario = idEstadoHorario;
    this.#estado = estado;
  }

  get dia() {
    return this.#dia;
  }

  get hora_inicio() {
    return this.#hora_inicio;
  }

  get hora_fin() {
    return this.#hora_fin;
  }

  get clasificacion() {
    return this.#clasificacion;
  }

  get limiteTurno() {
    return this.#limiteTurno;
  }

  get idProfecional() {
    return this.#idProfesional;
  }

  get idSucursal() {
    return this.#idSucursal;
  }

  get idEspecialidad() {
    return this.#idEspecialidad;
  }

  get idEstadoHorario() {
    return this.#idEstadoHorario;
  }

  get estado() {
    return this.#estado;
  }

  set dia(value) {
    this.#dia = value;
  }

  set hora_inicio(value) {
    this.#hora_inicio = value;
  }

  set hora_fin(value) {
    this.#hora_fin = value;
  }

  set clasificacion(value) {
    this.#clasificacion = value;
  }

  set limiteTurno(value) {
    this.#limiteTurno = value;
  }

  set idProfecional(value) {
    this.#idProfesional = value;
  }

  set idSucursal(value) {
    this.#idSucursal = value;
  }

  set idEspecialidad(value) {
    this.#idEspecialidad = value;
  }

  set idEstadoHorario(value) {
    this.#idEstadoHorario = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
