const conexion = require("../config/db.js")

class Profesional {
  #nombre;
  #apellido;
  #estado;

  constructor(nombre, apellido, estado) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#estado = estado;
  }

   // Darle e alta a un profesional
   static altaProfesional(idProfesional, callback) {
    const query = `
      UPDATE profesional 
      SET estado = 1 
      WHERE idProfesional = '${idProfesional}'
    `;

    conexion.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  //Esto sirve para darle de baja a un profesional 
  static bajaProfesional(idProfesional, callback) {
    const query = `
      UPDATE profesional 
      SET estado = 0 
      WHERE idProfesional = '${idProfesional}'
    `;

    conexion.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  //Crear un nuevo profesional
  static crearProfesional(data, callback) {
    const query = `
      INSERT INTO profesional (nombre, apellido, especialidad, estado) 
      VALUES ('${data.nombre}', '${data.apellido}', '${data.especialidad}', '${data.estado}')
    `;
  }

  // Metodo para actualizar el profesional
  static actualizarProfesional(data, idProfesional, callback) {
    const query = `
      UPDATE profesional 
      SET nombre = '${data.nombre}', apellido = '${data.apellido}', especialidad = '${data.especialidad}' 
      WHERE idProfesional = '${idProfesional}'
    `;
  }



}
