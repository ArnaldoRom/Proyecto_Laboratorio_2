class ProfesionalEspecializado {
  #idProfecional;
  #idEspecialidad;

  constructor(idProfecional, idEspecialidad) {
    this.#idProfecional = idProfecional;
    this.#idEspecialidad = idEspecialidad;
  }

  get idProfecional() {
    return this.#idProfecional;
  }

  get idEspecialidad() {
    return this.#idEspecialidad;
  }

  set idProfecional(value) {
    this.#idProfecional = value;
  }

  set idEspecialidad(value) {
    this.#idEspecialidad;
  }
}
