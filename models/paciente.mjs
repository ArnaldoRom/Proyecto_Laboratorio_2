class Paciente {
  #nombre;
  #apellido;
  #dni;
  #obraSocial;
  #datoContacto;
  #idUsuario;
  #estado;
  #fotocopiaDNI;

  constructor(
    nombre,
    apellido,
    dni,
    obraSocial,
    datoContacto,
    idUsuario,
    estado,
    fotocopiaDNI = null
  ) {
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#dni = dni;
    this.#obraSocial = obraSocial;
    this.#datoContacto = datoContacto;
    this.#idUsuario = idUsuario;
    this.#estado = estado;
    this.#fotocopiaDNI = fotocopiaDNI;
  }

  static async cargarPaciente(data) {
    try {
      const query = `
        INSERT INTO paciente (nombre, apellido, DNI, obraSocial, datosContacto, idUsuario, estado, fotocopiaDNI)
        VALUES (?, ?, ?, ?, ?, ?, 1, ?)
      `;

      const values = [
        data.nombre,
        data.apellido,
        data.DNI,
        data.obraSocial,
        data.datosContacto || null,
        data.idUsuario || null,
        data.fotocopiaDNI || null,
      ];

      const [result] = await conexion.query(query, values);
      return result.insertId;
    } catch (error) {
      console.error("Error al cargar Paciente", error);
      throw error;
    }
  }

  static async actualizarPaciente(data, id) {
    try {
      const query = `
        UPDATE paciente SET 
          nombre = IFNULL(?, nombre),
          apellido = IFNULL(?, apellido),
          DNI = IFNULL(?, DNI),
          obraSocial = IFNULL(?, obraSocial),
          datosContacto = IFNULL(?, datosContacto),
          idUsuario = IFNULL(?, idUsuario),
          fotocopiaDNI = IFNULL(?, fotocopiaDNI)
        WHERE idPaciente = ?
      `;

      const values = [
        data.nombre,
        data.apellido,
        data.DNI,
        data.obraSocial,
        data.datosContacto,
        data.idUsuario,
        data.fotocopiaDNI,
        id,
      ];

      const [rows] = await conexion.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error al Actualizar datos del Paciente", error);
      throw error;
    }
  }
}
