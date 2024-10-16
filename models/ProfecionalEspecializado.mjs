const conexion = require("../config/db.js")

class ProfesionalEspecializado {
  #idProfecionalEspecializado;
  #idEspecialidad;
  #idProfecional;
  #matricula;

  constructor(
    idEspecialidadidProfecional,
    idEspecialidad,
    idProfecional,
    matricula
  ) {
    this.#idProfecionalEspecializado = idEspecialidadidProfecional;
    this.#idEspecialidad = idEspecialidad;
    this.#idProfecional = idProfecional;
    this.#matricula = matricula;
  }

 // Crear los profesionales especializados
 static crearProfesionalEspecializado(data, callback) {
  conexion.query`INSERT INTO profesional_especializado (idEspecialidad, idProfecional, matricula) 
    VALUES ('${data.idEspecialidad}', '${data.idProfecional}', '${data.matricula}')`;
}

// Obtener todos los profesionales especializados
static obtenerProfesionalesEspecializados(callback) { //tengo que ver en la base de datos si es asi
  //Verificar la consulta en la base de datos
  conexion.query`
    SELECT profesional.nombre, profesional.apellido, especialidad.nombre, especialidad.descripcion FROM profesionalEspecializado
    JOIN profesional ON profesiona.idProfesional = profesionalEspecializado.idProfesioanl JOIN 
  `;
}

// Actualizar profesional especializado por id
static actualizarProfesionalEspecializado(data, idProfecionalEspecializado, callback) {
  conexion.query`
    UPDATE profesional_especializado 
    SET idEspecialidad = '${data.idEspecialidad}', idProfecional = '${data.idProfecional}', matricula = '${data.matricula}'
    WHERE idProfecionalEspecializado = '${idProfecionalEspecializado}'
  `;
}

// Eliminar profesionales especializado
static eliminarProfesionalEspecializado(idProfecionalEspecializado, callback) {
  conexion.query` DELETE FROM profesional_especializado 
  WHERE idProfecionalEspecializado = '${idProfecionalEspecializado}'
  `;
}

}
