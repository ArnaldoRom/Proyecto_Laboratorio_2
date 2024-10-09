class EstadoHorario {
  #estado;
  #duracionHorario;

  constructor(estado, duracionHorario) {
    this.#estado = estado;
    this.#duracionHorario = duracionHorario;
  }

  get estado() {
    return this.#estado;
  }

  get duracionHorariohorario() {
    return this.#duracionHorario;
  }

  set estado(value) {
    this.#estado = value;
  }

  set duracionHorariohorario(value) {
    this.#duracionHorario = value;
  }
}
