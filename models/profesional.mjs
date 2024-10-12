class Profesional {
  #nombre;
  #apellido;
  #estado;

  constructor(nombre, apellido, estado) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get apellido() {
    return this.#apellido;
  }

  get estado() {
    return this.#estado;
  }

  set nombre(value) {
    this.#nombre = value;
  }

  set apellido(value) {
    this.#apellido = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
