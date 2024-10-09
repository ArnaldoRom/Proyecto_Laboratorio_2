class Especialidad {
  #nombre;
  #descripcion;
  #estado;

  constructor(nombre, descripcion, estado) {
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get estado() {
    return this.#estado;
  }

  set nombre(value) {
    this.#nombre = value;
  }

  set descripcion(value) {
    this.#descripcion = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
