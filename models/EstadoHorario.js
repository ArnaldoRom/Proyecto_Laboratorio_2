class EstadoHorario {
  #estado;

  constructor(estado) {
    this.#estado = estado;
  }

  get estado() {
    return this.#estado;
  }

  set estado(value) {
    this.#estado = value;
  }
}
