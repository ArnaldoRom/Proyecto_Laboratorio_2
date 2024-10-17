import { conexion } from "../config/db.js";

class SobreTurno {
  #hora;
  #idTurno;
  #idAgenda;

  constructor(hora, idTurno, idAgenda, estado) {
    this.#hora = hora;
    this.#idTurno = idTurno;
    this.#idAgenda = idAgenda;
  }
}

export default SobreTurno;
