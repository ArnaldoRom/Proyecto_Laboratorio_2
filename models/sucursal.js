class Sucursal {
  #nombre;
  #ubicacion;
  #estado;

  constructor(nombre, ubicacion, estado) {
    this.#nombre = nombre;
    this.#ubicacion = ubicacion;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get ubicacion() {
    return this.#ubicacion;
  }

  get estado() {
    return this.#estado;
  }

  set nombre(value) {
    this.#nombre = value;
  }

  set ubicacion(value) {
    this.#ubicacion = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
