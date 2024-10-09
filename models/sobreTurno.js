class SobreTurno {
  #hora;
  #idTurno;
  #idAgenda;
  #estado;

  constructor(hora, idTurno, idAgenda, estado) {
    this.#hora = hora;
    this.#idTurno = idTurno;
    this.#idAgenda = idAgenda;
    this.#estado = estado;
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

  get estado() {
    return this.#estado;
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

  set estado(value) {
    this.#estado = value;
  }
}
