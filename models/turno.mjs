import { conexion } from "../config/db.js";

class Turno {
  #fecha;
  #hora;
  #clasificacion;
  #idPaciente;
  #idAgenda;
  #idEmpleado;
  #idListaEspera;
  #idEstadoHorario;
  #clasificacion;

  constructor( fecha, hora, clasificacion,idPaciente,idAgenda,idEmpleado,idEstadoHorario) {
    this.#fecha = fecha;
    this.#hora = hora;
    this.#clasificacion = clasificacion;
    this.#idPaciente = idPaciente;
    this.#idAgenda = idAgenda;
    this.#idEmpleado = idEmpleado;
    this.#idEstadoHorario = idEstadoHorario;
  }

  

  //crear un turno
  static crearTurno(data, callback){
    conexion.query`
    INSERT INTO turno (fecha, hora, idPaciente, idAgenda, idEmpleado, idEstadoHorario)
    VALUES ('${data.fecha}', '${data.hora}', '${data.idPaciente}', '${data.idAgenda}', 
    '${data.idEmpleado}', '${data.idEstadoHorario}')`, callback;
  }
  
  static crearTurnoConNull(data, callback){
    conexion.query`
    INSERT INTO turno (fecha, hora, clasificacion,idPaciente,idAgenda,idEmpleado,idEstadoHorario)
    VALUES ( null, null, null, null, '${data.idAgenda}', null, '${data.idEstadoHorario}')`, callback;
  }


  static modificarTurno(data, idTurno, callback) {
   conexion.query`
      UPDATE turno 
      SET fecha = '${data.fecha}', hora = '${data.hora}', 
          idPaciente = '${data.idPaciente}', idAgenda = '${data.idAgenda}', 
          idEmpleado = '${data.idEmpleado}', 
          idEstadoHorario = '${data.idEstadoHorario}'
      WHERE idTurno = '${idTurno}'
    `, callback;
  }

  //cambiar el estado actual a cualquier otro
  static cambiarEstado(estado, idTurno) {
    conexion.query`
      UPDATE turno 
      SET estado = '${estado}' 
      WHERE idTurno = '${idTurno}'
    `;
  }


  //Cambiar el estado siempre a libre
  static cambiarEstadoALibre(idTurno){
    conexion.query`
    UPDATE turno 
    SET estado = '2' 
    WHERE idTurno = '${idTurno}'
  `}

}

export default Turno;
