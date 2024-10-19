import conexion from "../config/db.js";

class Empleado {
  // Atributos privados
  #nombre;
  #numeroLegajo;
  #idSucursal;
  #idUsuario;
  #estado;

  constructor(nombre, numeroLegajo, idSucursal, idUsuario, estado) {
    this.#nombre = nombre;
    this.#numeroLegajo = numeroLegajo;
    this.#idSucursal = idSucursal;
    this.#idUsuario = idUsuario;
    this.#estado = estado;
  }

  // Método para crear un nuevo empleado
  static crearEmpleado(data, callback) {
    const query = `
      INSERT INTO empleado (nombre, numeroLegajo, idSucursal, idUsuario, estado) 
      VALUES ('${data.nombre}', '${data.numeroLegajo}', '${data.idSucursal}', '${data.idUsuario}', '${data.estado}')
    `;

    conexion.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  // Método para obtener todos los empleados
  static obtenerEmpleados(callback) {
    const query = `
      SELECT * FROM empleado
    `;

    conexion.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  // Método para actualizar un empleado por id
  static actualizarEmpleado(data, idEmpleado, callback) {
    const query = `
      UPDATE empleado 
      SET nombre = '${data.nombre}', numeroLegajo = '${data.numeroLegajo}', 
          idSucursal = '${data.idSucursal}', idUsuario = '${data.idUsuario}', estado = '${data.estado}'
      WHERE idEmpleado = '${idEmpleado}'
    `;

    conexion.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  // Método para eliminar (desactivar) un empleado por id
  static eliminarEmpleado(idEmpleado, callback) {
    const query = `
      UPDATE empleado 
      SET estado = 0 
      WHERE idEmpleado = '${idEmpleado}'
    `;

    conexion.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  // Método para activar un empleado por id
  static activarEmpleado(idEmpleado, callback) {
    const query = `
      UPDATE empleado 
      SET estado = 1 
      WHERE idEmpleado = '${idEmpleado}'
    `;

    conexion.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }
}

export default Empleado;