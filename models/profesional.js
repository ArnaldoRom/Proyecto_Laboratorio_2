import { conexion } from "../config/db.js";

class Profesional {
  #nombrePro;
  #apellidoPro;
  #estado;

  constructor(nombrePro, apellidoPro, estado) {
    this.#nombrePro = nombrePro;
    this.#apellidoPro = apellidoPro;
    this.#estado = estado;
  }

  // Dar de alta a un profesional
  static async altaProfesional(idProfesional) {
    try {
      const query = `
        UPDATE profesional 
        SET estado = 1 
        WHERE idProfesional = ?
      `;
      const [result] = await conexion.query(query, [idProfesional]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al dar de alta a un profesional", error);
      throw error;
    }
  }

  // Dar de baja a un profesional
  static async bajaProfesional(idProfesional) {
    try {
      const query = `
        UPDATE profesional 
        SET estado = 0 
        WHERE idProfesional = ?
      `;
      const [result] = await conexion.query(query, [idProfesional]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al dar de baja a un profesional", error);
      throw error;
    }
  }

  static async obtenerProfesional(nombre) {
    try {
      const query = "select idProfesional FROM profesional WHERE nombrePro = ?";
      const [result] = await conexion.query(query, [nombre]);
    } catch (error) {
      console.error("error al obtener el preofesional");
    }
  }

  static async obtenerLista() {
    try {
      const query = "SELECT * FROM profesional";
      const [result] = await conexion.query(query);
      return result;
    } catch (error) {
      console.error("Error al obtener el profesional: ", error);
    }
  }
  // Crear un nuevo profesional
  static async crearProfesional(data) {
    try {
      const query = `
        INSERT INTO profesional (nombrePro, apellidoPro, estado) 
        VALUES (?, ?, 1)
      `;
      const values = [data.nombrePro, data.apellidoPro];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un profesional", error);
      throw error;
    }
  }

  // Actualizar un profesional por id
  static async actualizarProfesional(data, idProfesional) {
    try {
      const query = `
        UPDATE profesional 
        SET nombrePro = ?, apellidoPro = ? 
        WHERE idProfesional = ?
      `;
      const values = [data.nombrePro, data.apellidoPro, idProfesional];
      const [result] = await conexion.query(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al actualizar un profesional", error);
      throw error;
    }
  }
}

export default Profesional;
