class Calendario {
  #idCalendario;
  #descripcion;
  #diasNoLaborables;
  #fechaInicio;
  #fechaFin;
  #anio;
  #estado;

  constructor(
    idCalendario,
    descripcion,
    diasNoLaborables,
    fechaInicio,
    fechaFin,
    anio,
    estado
  ) {
    this.#idCalendario = idCalendario;
    this.#descripcion = descripcion;
    this.#diasNoLaborables = diasNoLaborables;
    this.#fechaInicio = fechaInicio;
    this.#fechaFin = fechaFin;
    this.#anio = anio;
    this.#estado = estado;
  }

  get idCalendario() {
    return this.#idCalendario;
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

  get anio() {
    return this.#anio;
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

  set anio(value) {
    this.#anio = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
