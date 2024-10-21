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

  static async crearEspecialidad(data) {
    try {
      const query = `
        INSERT INTO especialidad (nombre, descripcion, estado) 
        VALUES (?, ?, ?)
      `;
      const [result] = await conexion.query(query, [data.nombre, data.descripcion, data.estado]);
      return result.insertId; 
    } catch (error) {
      console.error("Error al crear especialidad", error);
      throw error;
    }
  }

  // Obtiene todas las especialidades
  static async obtenerEspecialidades() {
    try {
      const query = "SELECT * FROM especialidad";
      const [rows] = await conexion.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener especialidades", error);
      throw error;
    }
  }

  // Actualiza una especialidad
  static async actualizarEspecialidad(data, idEspecialidad) {
    try {
      const query = `
        UPDATE especialidad 
        SET nombre = ?, descripcion = ?, estado = ?
        WHERE idEspecialidad = ?
      `;
      const [result] = await conexion.query(query, [data.nombre, data.descripcion, data.estado, idEspecialidad]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al actualizar especialidad", error);
      throw error;
    }
  }

  // desactivar una especialidad
  static async eliminarEspecialidad(idEspecialidad) {
    try {
      const query = `
        UPDATE especialidad 
        SET estado = 0 
        WHERE idEspecialidad = ?
      `;
      const [result] = await conexion.query(query, [idEspecialidad]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al eliminar especialidad", error);
      throw error;
    }
  }

  //  activar una especialidad
  static async activarEspecialidad(idEspecialidad) {
    try {
      const query = `
        UPDATE especialidad 
        SET estado = 1 
        WHERE idEspecialidad = ?
      `;
      const [result] = await conexion.query(query, [idEspecialidad]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al activar especialidad", error);
      throw error;
    }
  }
}

export default Especialidad;
