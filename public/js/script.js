function mostrarFormulario(tipoFormulario) {
  const container = document.getElementById("formulario-container");

  // Limpiar el contenedor
  container.innerHTML = "";

  if (tipoFormulario === "crearProfesional") {
    container.innerHTML = `
        div
          h2 Cargar Profesional Especializado
          h3 Datos del Profesional
          label(for="nombre") Nombre:
          input(type="text" id="nombre" name="nombre" required)
          label(for="apellido") Apellido:
          input(type="text" id="apellido" name="apellido" required)
          h3 Datos de la Especialidad
          label(for="especialidadNombre") Nombre de la especialidad:
          input(type="text" id="especialidadNombre" name="especialidadNombre" required)
          label(for="especialidadDescripcion") Descripción:
          input(type="text" id="especialidadDescripcion" name="especialidadDescripcion" required)
          h3 Datos de Registro
          label(for="matricula") Matrícula:
          input(type="text" id="matricula" name="matricula" required)
          button(type="button" onclick="guardarProfesionalEspecializado()") Guardar Profesional Especializado
      `;
  } else if (tipoFormulario === "cargarPaciente") {
  } else if (tipoFormulario === "crearUsuario") {
  }
}

function guardarProfesionalEspecializado() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const especialidadNombre =
    document.getElementById("especialidadNombre").value;
  const especialidadDescripcion = document.getElementById(
    "especialidadDescripcion"
  ).value;
  const matricula = document.getElementById("matricula").value;
}
