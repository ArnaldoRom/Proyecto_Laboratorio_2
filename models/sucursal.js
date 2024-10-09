class Sucursal {
  #nombre;
  #direccion;
  #clasificacion;
  #idCalendario;
  #estado;

  constructor(nombre, direccion, clasificacion, idCalendario, estado) {
    this.#nombre = nombre;
    this.#direccion = direccion;
    this.#clasificacion = clasificacion;
    this.#idCalendario = idCalendario;
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

  get idCalendario() {
    return this.#idCalendario;
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

  set idCalendario(value) {
    this.#idCalendario = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
