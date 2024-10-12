class Empleado {
  #nombre;
  #numeroLegajo;
  #idSucursal;
  #idUsuario;
  #estado;

  constructor(nombre, numeroLegajo, idSucursal, idUsuario, estado) {
    this.#nombre = nombre;
    this.#numeroLegajo = numeroLegajo;
    this.#idSucursal = idSucursal;
    this.#idUsuario = idUsuario;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get numeroLegajo() {
    return this.#numeroLegajo;
  }

  get idSucursal() {
    return this.#idSucursal;
  }

  get idUsuario() {
    return this.#idUsuario;
  }

  get estado() {
    return this.#estado;
  }

  set nombre(value) {
    this.#nombre = value;
  }

  set numeroLegajo(value) {
    this.#numeroLegajo = value;
  }

  set idSucursal(value) {
    this.#idSucursal = value;
  }

  set idUsuario(value) {
    this.#idUsuario = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
