import { conexion } from "../config/db.js";

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

  // Crear un nuevo empleado
  static async crearEmpleado(data) {
    try {
      const query = `
        INSERT INTO empleado (nombre, numeroLegajo, idSucursal, idUsuario, estado) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const values = [
        data.nombre,
        data.numeroLegajo,
        data.idSucursal,
        data.idUsuario,
        data.estado,
      ];
      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al crear un empleado", error);
      throw error;
    }
  }

  // Obtener todos los empleados
  static async obtenerEmpleados() {
    try {
      const [rows] = await conexion.query("SELECT * FROM empleado");
      return rows;
    } catch (error) {
      console.error("Error al obtener empleados", error);
      throw error;
    }
  }

  // Actualizar un empleado por id
  static async actualizarEmpleado(data, idEmpleado) {
    try {
      const query = `
        UPDATE empleado 
        SET nombre = ?, numeroLegajo = ?, idSucursal = ?, idUsuario = ?, estado = ?
        WHERE idEmpleado = ?
      `;
      const values = [
        data.nombre,
        data.numeroLegajo,
        data.idSucursal,
        data.idUsuario,
        data.estado,
        idEmpleado,
      ];
      const [result] = await conexion.query(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al actualizar un empleado", error);
      throw error;
    }
  }

  // Eliminar (desactivar) un empleado por id
  static async eliminarEmpleado(idEmpleado) {
    try {
      const query = `
        UPDATE empleado 
        SET estado = 0 
        WHERE idEmpleado = ?
      `;
      const [result] = await conexion.query(query, [idEmpleado]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al eliminar un empleado", error);
      throw error;
    }
  }

  // Activar un empleado por id
  static async activarEmpleado(idEmpleado) {
    try {
      const query = `
        UPDATE empleado 
        SET estado = 1 
        WHERE idEmpleado = ?
      `;
      const [result] = await conexion.query(query, [idEmpleado]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error al activar un empleado", error);
      throw error;
    }
  }
}

export default Empleado;
