import { conexion } from "../config/db.js";

class ProfesionalEspecializado {
  #idProfecionalEspecializado;
  #idEspecialidad;
  #idProfecional;
  #matricula;

  constructor(idProfecionalEspecializado, idEspecialidad, idProfecional, matricula) {
    this.#idProfecionalEspecializado = idProfecionalEspecializado;
    this.#idEspecialidad = idEspecialidad;
    this.#idProfecional = idProfecional;
    this.#matricula = matricula;
  }

  // Crear un nuevo profesional especializado
  static async crearProfesionalEspecializado(data) {
    try {
      const query = `
        INSERT INTO profesionalEspecializado (idEspecialidad, idProfecional, matricula) 
        VALUES (?, ?, ?)
      `;
      const values = [
        data.idEspecialidad,
        data.idProfecional,
        data.matricula,
      ];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un profesional especializado", error);
      throw error;
    }
  }

  // Obtener todos los profesionales especializados
  /*
  static async obtenerProfesionalesEspecializados() {
    try {
      const query = `
        SELECT profesional.nombre, profesional.apellido, especialidad.nombre AS especialidadNombre, especialidad.descripcion 
        FROM profecionalespecializado JOIN profesional ON profesional.idProfesional = profecionalespecializado.idProfesional JOIN especialidad ON especialidad.idEspecialidad = profecionalespecializado.idEspecialidad;
      `;
      const [rows] = await conexion.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener profesionales especializados", error);
      throw error;
    }
  }
*/
  // Actualizar un profesional especializado por id
  static async actualizarProfesionalEspecializado(data, idProfecionalEspecializado) {
    try {
      const query = `
        UPDATE profesionalEspecializado 
        SET idEspecialidad = ?, idProfecional = ?, matricula = ?
        WHERE idProfecionalEspecializado = ?
      `;
      const values = [
        data.idEspecialidad,
        data.idProfecional,
        data.matricula,
        idProfecionalEspecializado,
      ];
      const [result] = await conexion.query(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al actualizar un profesional especializado", error);
      throw error;
    }
  }

  // Eliminar (desactivar) un profesional especializado por id
  /*
  static async eliminarProfesionalEspecializado(idProfecionalEspecializado) {
    try {
      const query = `
        UPDATE FROM profesionalEspecializado SET

        WHERE idProfecionalEspecializado = ?
      `;
      const [result] = await conexion.query(query, [idProfecionalEspecializado]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al eliminar un profesional especializado", error);
      throw error;
    }
  }
    */
}

export default ProfesionalEspecializado;
