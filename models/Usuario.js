class Usuario {
  #nombreUsuario;
  #contraseña;
  #rol;
  #estado;

  constructor(nombreUsuario, contraseña, rol, estado) {
    this.#nombreUsuario = nombreUsuario;
    this.#contraseña = contraseña;
    this.#rol = rol;
    this.#estado = estado;
  }

  get nombreUsuario() {
    return this.#nombreUsuario;
  }

  get contraseña() {
    return this.#contraseña;
  }

  get rol() {
    return this.#rol;
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

  set rol(value) {
    this.#rol = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
