import { conexion } from "../config/db.js";

class Sucursal {
  #nombre;
  #direccion;
  #clasificacion;
  #estado;

  constructor(nombre, direccion, clasificacion, estado) {
    this.#nombre = nombre;
    this.#direccion = direccion;
    this.#clasificacion = clasificacion;
    this.#estado = estado;
  }

  static async getSucursal() {
    try {
      const [rows] = await conexion.query("SELECT * FROM sucursal");
      return rows;
    } catch (error) {
      console.error("Error al obtener Sucursal", error);
      throw error;
    }
  }

  static async getSucursalId(id) {
    try {
      const [rows] = await conexion.query(
        "SELECT * FROM sucursal WHERE idSucursal = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al recuperar la Sucursal");
      throw error;
    }
  }

  static async cargarSucursal(data) {
    try {
      const query = `
        INSERT INTO sucursal (nombre, direccion, clasificacion, estado) VALUES (?, ?, ?, 1) `;

      const values = [data.nombre, data.direccion, data.clasificacion];

      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al agregar una nueva Sucursal", error);
      throw error;
    }
  }

  static async actualizarSucursal(data, id) {
    try {
      const query =
        "UPDATE sucursal SET nombre = IFNULL(?, nombre), direccion = IFNULL(?, direccion), clasificacion = IFNULL(?, clasificacion) WHERE idSucursal = ?";

      const values = [data.nombre, data.direccion, data.clasificacion, id];

      const [rows] = await conexion.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error al Actualizar la Sucursal");
      throw error;
    }
  }

  static async bajaSucursal(id) {
    try {
      const [rows] = await conexion.query(
        "UPDATE sucursal SET estado = 0 WHERE idSucursal = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al dar de baja la Sucursal");
      throw error;
    }
  }

  static async altaSucursal(id) {
    try {
      const [rows] = await conexion.query(
        "UPDATE sucursal SET estado = 1 WHERE idSucursal = ?",
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error al dar de alta la Sucursal");
      throw error;
    }
  }
}

export default Sucursal;
