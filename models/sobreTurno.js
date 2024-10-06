class SobreTurno {
  #turno;
  #paciente;

  constructor(turno, paciente) {
    this.#turno = turno;
    this.#paciente = paciente;
  }

  get turno() {
    return this.#turno;
  }

  get paciente() {
    return this.#paciente;
  }
}
