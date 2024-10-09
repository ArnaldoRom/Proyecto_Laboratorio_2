class ListaEspera {
  #idPaciente;

  constructor(idPaciente) {
    this.#idPaciente = idPaciente;
  }

  get idPaciente() {
    return this.#idPaciente;
  }

  set idPaciente(value) {
    this.#idPaciente = value;
  }
}
