import conexion from "../config/db.js";

class Empleado {
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

  // crear un nuevo empleado
  static crearEmpleado(data, callback) {
    conexion.query`
      INSERT INTO empleado (nombre, numeroLegajo, idSucursal, idUsuario, estado) 
      VALUES ('${data.nombre}', '${data.numeroLegajo}', '${data.idSucursal}', '${data.idUsuario}', '${data.estado}')
    `;
  }

  //obtener todos los empleados
  static obtenerEmpleados(callback) {
    conexion.query`
      SELECT * FROM empleado
    `;

  }

  // actualizar un empleado por id
  static actualizarEmpleado(data, idEmpleado, callback) {
    conexion.query`
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

  //eliminar (desactivar) un empleado por id
  static eliminarEmpleado(idEmpleado, callback) {
    conexion.query`
      UPDATE empleado 
      SET estado = 0 
      WHERE idEmpleado = '${idEmpleado}'
    `;
  }

  // activar un empleado por id
  static activarEmpleado(idEmpleado, callback) {
     conexion.query`
      UPDATE empleado 
      SET estado = 1 
      WHERE idEmpleado = '${idEmpleado}'
    `;
  }
}

export default Empleado;