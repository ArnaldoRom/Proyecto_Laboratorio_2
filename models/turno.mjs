const conexion = require("../config/db.js")

class Turno {
  #fecha;
  #hora;
  #idPaciente;
  #idAgenda;
  #idEmpleado;
  #idListaEspera;
  #idEstadoHorario;
  #clasificacion;

  constructor( fecha, hora, clasificacion,idPaciente,idAgenda,idEmpleado,idListaEspera,idEstadoHorario) {
    this.#fecha = fecha;
    this.#hora = hora;
    this.#clasificacion = clasificacion;
    this.#idPaciente = idPaciente;
    this.#idAgenda = idAgenda;
    this.#idEmpleado = idEmpleado;
    this.#idListaEspera = idListaEspera;
    this.#idEstadoHorario = idEstadoHorario;

  }

  //crear un turno
  static crearTurno(data, callback){
    conexion.query`
    INSERT INTO turno (fecha, hora, idPaciente, idAgenda, idEmpleado, idListaEspera, idEstadoHorario)
    VALUES ('${data.fecha}', '${data.hora}', '${data.idPaciente}', '${data.idAgenda}', '${data.idEmpleado}', '${data.idListaEspera}', '${data.idEstadoHorario}')
  `;
  }
  
  static crearTurnoConNull(data, callback){
    conexion.query`
    INSERT INTO turno (clasificacion, fecha, hora, idPaciente, idAgenda, idEmpleado, idListaEspera, idEstadoHorario)
    VALUES (null, null, null, null, '${data.idAgenda}', null, null, null)
  `;
  }


  static modificarTurno(data, idTurno, callback) {
   conexion.query`
      UPDATE turno 
      SET fecha = '${data.fecha}', hora = '${data.hora}', 
          idPaciente = '${data.idPaciente}', idAgenda = '${data.idAgenda}', 
          idEmpleado = '${data.idEmpleado}', idListaEspera = '${data.idListaEspera}', 
          idEstadoHorario = '${data.idEstadoHorario}'
      WHERE idTurno = '${idTurno}'
    `;
  }

  //cambiar el estado actual a cualquier otro
  static cambiarEstado(estado, idTurno, callback) {
    conexion.query`
      UPDATE turno 
      SET estado = '${estado}' 
      WHERE idTurno = '${idTurno}'
    `;
  }

  //borrar un turno
  static borrarTurno(idTurno, callback) {
    conexion.query`
      UPDATE turno 
      SET estado = 0 
      WHERE idTurno = '${idTurno}'
    `;
  }

  //Cambiar el estado siempre a libre
  static cambiarEstadoALibre(idTurno, callback){
    conexion.query`
    UPDATE turno 
    SET estado = '2' 
    WHERE idTurno = '${idTurno}'
  `
  }

}
module.exports = Turno;
