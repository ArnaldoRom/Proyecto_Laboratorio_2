class Paciente {
  #nombre;
  #apellido;
  #dni;
  #motivoConsulta;
  #obraSocial;
  #datoContacto;
  #idUsuario;
  #estado;

  contructor(
    nombre,
    apellido,
    dni,
    motivoConsulta,
    obraSocial,
    datoContacto,
    idUsuario,
    estado
  ) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#dni = dni;
    this.#motivoConsulta = motivoConsulta;
    this.#obraSocial = obraSocial;
    this.#datoContacto = datoContacto;
    this.#idUsuario = idUsuario;
    this.#estado = estado;
  }

  get nombre() {
    return this.#nombre;
  }

  get apellido() {
    return this.#apellido;
  }

  get dni() {
    return this.#dni;
  }

  get motivoConsulta() {
    return this.#motivoConsulta;
  }

  get obraSocial() {
    return this.#obraSocial;
  }

  get datoContacto() {
    return this.#datoContacto;
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

  set apellido(value) {
    this.#apellido = value;
  }

  set dni(value) {
    this.#dni = value;
  }

  set motivoConsulta(value) {
    this.#motivoConsulta = value;
  }

  set obraSocial(value) {
    this.#obraSocial = value;
  }

  set datoContacto(value) {
    this.#datoContacto = value;
  }

  set idUsuario(value) {
    this.#idUsuario = value;
  }

  set estado(value) {
    this.#estado = value;
  }
}
