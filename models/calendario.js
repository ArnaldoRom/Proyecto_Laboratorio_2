class Calendario {
  #descripcion;
  #diasNoLaborables;
  #fechaInicio;
  #fechaFin;
  #año;
  #estado;

  constructor(
    descripcion,
    diasNoLaborables,
    fechaInicio,
    fechaFin,
    año,
    estado
  ) {
    this.#descripcion = descripcion;
    this.#diasNoLaborables = diasNoLaborables;
    this.#fechaInicio = fechaInicio;
    this.#fechaFin = fechaFin;
    this.#año = año;
    this.#estado = estado;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get diasNoLaborables() {
    return this.#diasNoLaborables;
  }

  get fechaInicio() {
    return this.#fechaInicio;
  }

  get fechaFin() {
    return this.#fechaFin;
  }

  get año() {
    return this.#año;
  }

  get estado() {
    return this.#estado;
  }

  set descripcion(value) {
    this.#descripcion = value;
  }

  set diasNoLaborables(value) {
    this.#diasNoLaborables = value;
  }

  set fechaInicio(value) {
    this.#fechaInicio = value;
  }

  set fechaFin(value) {
    this.#fechaFin = value;
  }

  set año(value) {
    this.#año = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
