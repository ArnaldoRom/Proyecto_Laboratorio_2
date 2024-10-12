class Agenda {
  #dia;
  #duracionHorario;
  #hora_inicio;
  #hora_fin;
  #clasificacion;
  #limiteTurno;
  #idProfesionalEspecializado;
  #idSucursal;
  #idEstadoHorario;
  #idCalendario;
  #estado;

  constructor(
    dia,
    duraqcionHorario,
    hora_inicio,
    hora_fin,
    clasificacion,
    limiteTurno,
    idProfecionalEspecializado,
    idSucursal,
    idEstadoHorario,
    idCalendario,
    estado
  ) {
    this.#dia = dia;
    this.#duracionHorario = duraqcionHorario;
    this.#hora_inicio = hora_inicio;
    this.#hora_fin = hora_fin;
    this.#clasificacion = clasificacion;
    this.#limiteTurno = limiteTurno;
    this.#idProfesionalEspecializado = idProfecionalEspecializado;
    this.#idSucursal = idSucursal;
    this.#idEstadoHorario = idEstadoHorario;
    this.#idCalendario = idCalendario;
    this.#estado = estado;
  }

  get dia() {
    return this.#dia;
  }

  get duraqcionHorario() {
    return this.#duracionHorario;
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

  get idProfecionalEspecializado() {
    return this.#idProfesionalEspecializado;
  }

  get idSucursal() {
    return this.#idSucursal;
  }

  get idEstadoHorario() {
    return this.#idEstadoHorario;
  }

  get idCalendario() {
    return this.#idCalendario;
  }

  get estado() {
    return this.#estado;
  }

  set dia(value) {
    this.#dia = value;
  }

  set duracionHorario(value) {
    this.#duracionHorario = value;
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

  set idProfecionalEspecializado(value) {
    this.#idProfesionalEspecializado = value;
  }

  set idSucursal(value) {
    this.#idSucursal = value;
  }

  set idEstadoHorario(value) {
    this.#idEstadoHorario = value;
  }

  set idCalendario(value) {
    this.#idCalendario = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
