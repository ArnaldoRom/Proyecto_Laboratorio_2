class agenda {
  #turno;
  #profesional;
  #tipoConsulta;
  #sucursal;
  #descripcion;
  #especialidad;
  #listaEspera;
  #calendario;
  #horario;
  #estado;

  constructor(
    turno,
    profesional,
    tipoConsulta,
    sucursal,
    descripcion,
    especialidad,
    listaEspera,
    calendario,
    horario,
    estado
  ) {
    this.#turno = turno;
    this.#profesional = profesional;
    this.#tipoConsulta = tipoConsulta;
    this.#sucursal = sucursal;
    this.#descripcion = descripcion;
    this.#especialidad = especialidad;
    this.#listaEspera = listaEspera;
    this.#calendario = calendario;
    this.#horario = horario;
    this.#estado = estado;
  }

  get turno() {
    return this.#turno;
  }

  get profesional() {
    return this.#profesional;
  }

  get tipoConsulta() {
    return this.#tipoConsulta;
  }

  get sucursal() {
    return this.#sucursal;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get especialidad() {
    return this.#especialidad;
  }

  get listaEspera() {
    return this.#listaEspera;
  }

  get calendario() {
    return this.#calendario;
  }

  get horario() {
    return this.#horario;
  }

  get estado() {
    return this.#estado;
  }

  set turno(value) {
    this.#turno = value;
  }

  set profesional(value) {
    this.#profesional = value;
  }

  set tipoConsulta(value) {
    this.#tipoConsulta = value;
  }

  set sucursal(value) {
    this.#sucursal = value;
  }

  set descripcion(value) {
    this.#descripcion = value;
  }

  set especialidad(value) {
    this.#especialidad = value;
  }

  set listaEspera(value) {
    this.#listaEspera = value;
  }

  set calendario(value) {
    this.#calendario = value;
  }

  set horario(value) {
    this.#horario = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
