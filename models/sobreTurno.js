class SobreTurno {
  #hora;
  #idTurno;
  #idAgenda;

  constructor(hora, idTurno, idAgenda, estado) {
    this.#hora = hora;
    this.#idTurno = idTurno;
    this.#idAgenda = idAgenda;
  }

  get hora() {
    return this.#hora;
  }

  get idTurno() {
    return this.#idTurno;
  }

  get idAgenda() {
    return this.#idAgenda;
  }

  set hora(value) {
    this.#hora = value;
  }

  set idTurno(value) {
    this.#idTurno = value;
  }

  set idAgenda(value) {
    this.#idAgenda = value;
  }
}
