class Sucursal {
  #nombre;
  #direccion;
  #clasificacion;
  #estado;

  constructor(nombre, direccion, clasificacion, estado) {
    this.#nombre = nombre;
    this.#direccion = direccion;
    this.#clasificacion = clasificacion;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get direccion() {
    return this.#direccion;
  }

  get clasificacion() {
    return this.#clasificacion;
  }

  get estado() {
    return this.#estado;
  }

  set nombre(value) {
    this.#nombre = value;
  }

  set direccion(value) {
    this.#direccion = value;
  }

  set clasificacion(value) {
    this.#clasificacion = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
