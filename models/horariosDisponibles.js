class HorarioDisponible {
  #fecha;
  #horario;
  #estado;

  constructor(fecha, horario, estado) {
    this.#fecha = fecha;
    this.#horario = horario;
    this.#estado = estado;
  }

  get fecha() {
    return this.#fecha;
  }

  get horario() {
    return this.#horario;
  }

  get estado() {
    return this.#estado;
  }

  set fecha(value) {
    this.#fecha = value;
  }

  set horario(value) {
    this.#horario = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
