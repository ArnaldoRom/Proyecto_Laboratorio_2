class ListaEspera {
  #idPaciente;
  #idTurno;
  #idAgenda;

  constructor(idPaciente, idTurno, idAgenda) {
    this.#idPaciente = idPaciente;
    this.#idTurno = idTurno;
    this.#idAgenda = idAgenda;
  }

  get idPaciente() {
    return this.#idPaciente;
  }

  get idTurno() {
    return this.#idTurno;
  }

  get idAgenda() {
    return this.#idAgenda;
  }

  set idPaciente(value) {
    this.#idPaciente = value;
  }

  set idTurno(value) {
    this.#idTurno = value;
  }

  set idAgenda(value) {
    this.#idAgenda = value;
  }
}
