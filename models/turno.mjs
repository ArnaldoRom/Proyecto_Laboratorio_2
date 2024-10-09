class Turno {
  #fecha;
  #hora;
  #estado;
  #idPaciente;
  #idAgenda;
  #idSucursal;
  #idEmpleado;
  #idListaEspera;
  #idEstadoHorario;

  constructor(
    fecha,
    hora,
    estado,
    idPaciente,
    idAgenda,
    idSucursal,
    idEmpleado,
    idListaEspera,
    idEstadoHorario
  ) {
    this.#fecha = fecha;
    this.#hora = hora;
    this.#estado = estado;
    this.#idPaciente = idPaciente;
    this.#idAgenda = idAgenda;
    this.#idSucursal = idSucursal;
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
  get estado() {
    return this.#estado;
  }

  get idPaciente() {
    return this.#idPaciente;
  }

  get idAgenda() {
    return this.#idAgenda;
  }

  get idSucursal() {
    return this.#idSucursal;
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

  set estado(value) {
    this.#estado = value;
  }

  set idPaciente(value) {
    this.#idPaciente = value;
  }

  set idAgenda(value) {
    this.#idAgenda = value;
  }

  set idSucursal(value) {
    this.#idSucursal = value;
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
