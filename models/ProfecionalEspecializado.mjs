class ProfesionalEspecializado {
  #idProfecionalEspecializado;
  #idEspecialidad;
  #idProfecional;
  #matricula;

  constructor(
    idEspecialidadidProfecional,
    idEspecialidad,
    idProfecional,
    matricula
  ) {
    this.#idProfecionalEspecializado = idEspecialidadidProfecional;
    this.#idEspecialidad = idEspecialidad;
    this.#idProfecional = idProfecional;
    this.#matricula = matricula;
  }

  get idEspecialidadidProfecional() {
    return this.#idProfecionalEspecializado;
  }

  get idEspecialidad() {
    return this.#idEspecialidad;
  }

  get idProfecional() {
    return this.#idProfecional;
  }

  get matricula() {
    return this.#matricula;
  }

  set idEspecialidadidProfecional(value) {
    this.#idProfecionalEspecializado = value;
  }

  set idEspecialidad(value) {
    this.#idEspecialidad;
  }

  set idProfecional(value) {
    this.#idProfecional = value;
  }

  set matricula(value) {
    this.#matricula = value;
  }
}
