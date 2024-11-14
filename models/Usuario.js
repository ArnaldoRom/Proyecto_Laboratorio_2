import { conexion } from "../config/db.js";
import bcrypt from 'bcrypt';
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
      // Generar un hash de la contraseña
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(data.contrasena, saltRounds);
  
      const query = `INSERT INTO usuario (nombreUsuario, contrasena, rol, estado) VALUES (?, ?, ?, 1)`;
      const values = [
        data.nombreUsuario,
        hashedPassword, 
        data.rol || 'Paciente',
      ];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un usuario", error);
      throw error;
    }
  }
  
//iniciar sesion
static async iniciarSesion(data) {
  try {
    console.log("Datos de inicio de sesión:", data);
    const query = `
      SELECT nombreUsuario, contrasena, rol FROM usuario 
      WHERE nombreUsuario = ?
    `;
    const values = [data.nombreUsuario];
    const [result] = await conexion.query(query, values);

    console.log("Resultado de la consulta:", result);

    // Verificar si se encontró un usuario
    if (result.length === 0) {
      throw new Error('Credenciales incorrectas');
    }

    // Aquí es donde debes usar la contraseña en texto plano
    const isMatch = await bcrypt.compare(data.contrasena, result[0].contrasena);
    console.log("Coincidencia de contraseña:", isMatch);

    if (!isMatch) {
      throw new Error('Credenciales incorrectas');
    }

    return result[0]; // Retorna el primer usuario encontrado
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    throw error;
  }
}

static async obtenerPacientePorUsuario(idUsuario) {
  try {
    const query = "SELECT paciente.idPaciente FROM usuario JOIN paciente ON usuario.idUsuario = paciente.idUsuario WHERE usuario.idUsuario = ?";
    const value = [idUsuario]; 
    const result = await conexion.query(query, value);
    return result;
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    throw error;
  }
}


static async traerUsuarios() {
  try {
    const [rows] = await conexion.query("SELECT nombreUsuario FROM usuario");
    return rows;
  } catch (error) {
    console.error("Error al obtener nombres de usuarios", error);
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

  static async traerUsuarios() {
    try {
      const [rows] = await conexion.query("SELECT nombreUsuario FROM usuario");
      return rows;
    } catch (error) {
      console.error("Error al obtener nombres de usuarios", error);
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

