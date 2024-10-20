import { conexion } from "../config/db.js";

class Especialidad {
  #nombre;
  #descripcion;
  #estado;

  constructor(nombre, descripcion, estado) {
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#estado = estado;
  }

  static crearEspecialidad(data, callback) {
    conexion.query`
      INSERT INTO especialidad (nombre, descripcion, estado) 
      VALUES ('${data.nombre}', '${data.descripcion}', '${data.estado}')
    `;
  }

  // obtiene todas las especialidades
  static obtenerEspecialidades(callback) {
    conexion.query`
      SELECT * FROM especialidad
    `;
  }

  // Actualizar la especialidad
  static actualizarEspecialidad(data, idEspecialidad, callback) {
    cconexion.query`
      UPDATE especialidad 
      SET nombre = '${data.nombre}', descripcion = '${data.descripcion}', estado = '${data.estado}'
      WHERE idEspecialidad = '${idEspecialidad}'
    `;
  }

  // metodo para desactivar una especialidad
  static eliminarEspecialidad(idEspecialidad, callback) {
    conexion.query`
      UPDATE especialidad 
      SET estado = 0 
      WHERE idEspecialidad = '${idEspecialidad}'
    `;
  }

  // Metoo para activar una especialidad
  static activarEspecialidad(idEspecialidad, callback) {
    conexion.query`
      UPDATE especialidad 
      SET estado = 1 
      WHERE idEspecialidad = '${idEspecialidad}'
    `;
  }
  
}
export default Especialidad;