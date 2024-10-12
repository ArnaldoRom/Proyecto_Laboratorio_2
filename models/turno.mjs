class Turno {
  #fecha;
  #hora;
  #idPaciente;
  #idAgenda;
  #idEmpleado;
  #idListaEspera;
  #idEstadoHorario;

  constructor(
    fecha,
    hora,
    idPaciente,
    idAgenda,
    idEmpleado,
    idListaEspera,
    idEstadoHorario
  ) {
    this.#fecha = fecha;
    this.#hora = hora;
    this.#idPaciente = idPaciente;
    this.#idAgenda = idAgenda;
    this.#idEmpleado = idEmpleado;
    this.#idListaEspera = idListaEspera;
    this.#idEstadoHorario = idEstadoHorario;
  }

  get fecha() {
    return this.#fecha;
  }

  get hora() {
    return this.#hora;
  }

  get idPaciente() {
    return this.#idPaciente;
  }

  get idAgenda() {
    return this.#idAgenda;
  }

  get idEmpleado() {
    return this.#idEmpleado;
  }

  get idListaEspera() {
    return this.#idListaEspera;
  }

  get idEstadoHorario() {
    return this.#idEstadoHorario;
  }

  set fecha(value) {
    this.#fecha = value;
  }

  set hora(value) {
    this.#hora = value;
  }

  set idPaciente(value) {
    this.#idPaciente = value;
  }

  set idAgenda(value) {
    this.#idAgenda = value;
  }

  set idEmpleado(value) {
    this.#idEmpleado = value;
  }

  set idListaEspera(value) {
    this.#idListaEspera = value;
  }

  set idEstadoHorario(value) {
    this.#idEstadoHorario = value;
  }
}
