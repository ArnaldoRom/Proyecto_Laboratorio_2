class Profesional {
  #nombre;
  #apellido;
  #matricula;
  #estado;

  constructor(nombre, apellido, matricula, estado) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#matricula = matricula;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get apellido() {
    return this.#apellido;
  }

  get matricula() {
    return this.#matricula;
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

  set matricula(value) {
    this.#matricula = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
