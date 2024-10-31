import { conexion } from "../config/db.js";

class Usuario {
  #nombreUsuario;
  #contrasena;
  #rol;
  #estado;

  constructor(nombreUsuario, contrasena, rol, estado) {
    this.#nombreUsuario = nombreUsuario;
    this.#contrasena = contrasena;
    this.#rol = rol;
    this.#estado = estado;
  }
//crearUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuario, activarUsuario
  // Crear un nuevo usuario
  static async crearUsuario(data) {
    try {
      
      const query = `
        INSERT INTO usuario (nombreUsuario, contrasena, rol, estado) 
        VALUES (?, ?, ?, 1)
      `;
      const values = [
        data.nombreUsuario,
        data.contrasena,
        data.rol || 'Paciente', // Asignar 'Paciente' por defecto si no se proporciona
      ];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un usuario", error);
      throw error;
    }
  }

  // Obtener todos los usuarios
  static async obtenerUsuarios() {
    try {
      const [rows] = await conexion.query("SELECT * FROM usuario");
      return rows;
    } catch (error) {
      console.error("Error al obtener usuarios", error);
      throw error;
    }
  }

  // Actualizar un usuario por id
  static async actualizarUsuario(data, idUsuario) {
    try {
      const query = `
        UPDATE usuario 
        SET nombreUsuario = ?, contraseña = ?, rol = ?, estado = ?
        WHERE idUsuario = ?
      `;
      const values = [
        data.nombreUsuario,
        data.contraseña,
        data.rol,
        data.estado,
        idUsuario,
      ];
      const [result] = await conexion.query(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al actualizar un usuario", error);
      throw error;
    }
  }

  // Eliminar (desactivar) un usuario por id
  static async eliminarUsuario(idUsuario) {
    try {
      const query = `
        UPDATE usuario 
        SET estado = 0 
        WHERE idUsuario = ?
      `;
      const [result] = await conexion.query(query, [idUsuario]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al eliminar un usuario", error);
      throw error;
    }
  }

  // Activar un usuario por id
  static async activarUsuario(idUsuario) {
    try {
      const query = `
        UPDATE usuario 
        SET estado = 1 
        WHERE idUsuario = ?
      `;
      const [result] = await conexion.query(query, [idUsuario]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al activar un usuario", error);
      throw error;
    }
  }
}

export default Usuario;

