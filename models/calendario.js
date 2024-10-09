class Calendario {
  #diasNoLaborables;
  #año;
  #estado;

  constructor(diasNoLaborables, año, estado) {
    this.#diasNoLaborables = diasNoLaborables;
    this.#año = año;
    this.#estado = estado;
  }

  get diasNoLaborables() {
    return this.#diasNoLaborables;
  }

  get año() {
    return this.#año;
  }

  get estado() {
    return this.#estado;
  }

  set diasNoLaborables(value) {
    this.#diasNoLaborables = value;
  }

  set año(value) {
    this.#año = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
