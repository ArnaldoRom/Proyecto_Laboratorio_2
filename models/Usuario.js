class Usuario {
  #nombreUsuario;
  #contraseña;
  #estado;

  constructor(nombreUsuario, contraseña, estado) {
    this.#nombreUsuario = nombreUsuario;
    this.#contraseña = contraseña;
    this.#estado = estado;
  }

  get nombreUsuario() {
    return this.#nombreUsuario;
  }

  get contraseña() {
    return this.#contraseña;
  }

  get estado() {
    return this.#estado;
  }

  set nombreUsuario(value) {
    this.#nombreUsuario = value;
  }

  set contraseña(value) {
    this.#contraseña = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
