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
 //crear un nuevo usuario
 static crearUsuario(data, callback) {
  conexion.query`
    INSERT INTO usuario (nombreUsuario, contraseña, rol, estado) 
    VALUES ('${data.nombreUsuario}', '${data.contraseña}', 'Paciente', '${data.estado}')`;
}

// Método para obtener todos los usuarios
static obtenerUsuarios(callback) {
  conexion.query`SELECT * FROM usuario `;
}

//actualizar un usuario por id
static actualizarUsuario(data, idUsuario, callback) {
  conexion.query`UPDATE usuario SET nombreUsuario = '${data.nombreUsuario}', contraseña = '${data.contraseña}', 
        rol = '${data.rol}', estado = '${data.estado}' WHERE idUsuario = '${idUsuario}'`;
}

// eliminar (desactivar) un usuario por id
static eliminarUsuario(idUsuario, callback) {
  conexion.query`UPDATE usuario SET estado = 0 WHERE idUsuario = '${idUsuario}'`;
}

//activar un usuario por id
static activarUsuario(idUsuario, callback) {
  conexion.query`UPDATE usuario  SET estado = 1  WHERE idUsuario = '${idUsuario}'`;
}

}
export default Usuario;
