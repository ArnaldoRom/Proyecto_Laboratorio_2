import { conexion } from "../config/db.js";

class Usuario {
  #nombreUsuario;
  #contraseña;
  #rol;
  #estado;

  constructor(nombreUsuario, contraseña, rol, estado) {
    this.#nombreUsuario = nombreUsuario;
    this.#contraseña = contraseña;
    this.#rol = rol;
    this.#estado = estado;
  }

  // Crear un nuevo usuario
  static async crearUsuario(data) {
    try {
      const query = `
        INSERT INTO usuario (nombreUsuario, contraseña, rol, estado) 
        VALUES (?, ?, ?, ?)
      `;
      const values = [
        data.nombreUsuario,
        data.contraseña,
        data.rol || 'Paciente', // Asignar 'Paciente' por defecto si no se proporciona
        data.estado,
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

