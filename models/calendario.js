class Calendario {
  #fecha;
  #descripcion;

  constructor(fecha, descripcion) {
    this.#fecha = fecha;
    this.#descripcion = descripcion;
  }

  get fecha() {
    return this.#fecha;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set fecha(value) {
    this.#fecha = value;
  }

  set descripcion(value) {
    this.#descripcion = value;
  }
}
