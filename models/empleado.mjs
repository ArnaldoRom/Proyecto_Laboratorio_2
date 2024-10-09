class Empleado {
  #nombre;
  #rol;
  #numeroLegajo;
  #idSucursal;
  #idUsuario;
  #estado;

  constructor(nombre, rol, numeroLegajo, idSucursal, idUsuario, estado) {
    this.#nombre = nombre;
    this.#rol = rol;
    this.#numeroLegajo = numeroLegajo;
    this.#idSucursal = idSucursal;
    this.#idUsuario = idUsuario;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get rol() {
    return this.#rol;
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

  set rol(value) {
    this.#rol = value;
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
