class ListaEspera {
  #profeccional;

  constructor(profecional) {
    this.#profeccional = profecional;
  }

  get profecional() {
    return this.#profeccional;
  }
}
