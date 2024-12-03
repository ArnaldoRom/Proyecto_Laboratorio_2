const abrirModal = document.getElementById("abrir-modal");
const modal = document.getElementById("modal");
const exito = document.getElementById("exito");
const botonRegistrar = document.getElementById("boton-registrar");

// Abre el modal al hacer clic en el boton
if (abrirModal && modal && exito && botonRegistrar) {
  abrirModal.addEventListener("click", () => {
    modal.showModal();
  });

  // Cerrar el modal si se hace clic fuera del contenido
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  // Manejar el clic en el boton "Registrar"
  botonRegistrar.addEventListener("click", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const DNI = parseInt(document.getElementById("dni").value.trim(), 10);
    const obraSocial = document.getElementById("obraSocial").value.trim();
    const datosContacto = document.getElementById("datosContacto").value.trim();
    const contrasenaRegistro = document
      .getElementById("contrasenaRegistro")
      .value.trim();
    const fotocopiaDni = document.getElementById("fotocopiaDni").files[0]; // Capturar archivo

    // Validaciones
    if (
      !nombre ||
      !apellido ||
      !DNI ||
      !datosContacto ||
      !contrasenaRegistro ||
      !fotocopiaDni
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (contrasenaRegistro.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!/^[\w.-]+@[\w.-]+\.(com)$/i.test(datosContacto)) {
      alert(
        "El campo de contacto debe ser un correo electrónico válido (debe contener '@' y terminar en '.com')."
      );
      return;
    }

    try {
      // Validación para comprobar si el correo esta utilizado
      const responseUsuarios = await fetch("/usuariosLista");
      if (!responseUsuarios.ok)
        throw new Error("Error al verificar usuarios existentes");

      const usuarios = await responseUsuarios.json();
      const usuarioExistente = usuarios.find(
        (user) => user.nombreUsuario === datosContacto
      );

      if (usuarioExistente) {
        alert("Este usuario ya existe.");
        return;
      }

      // Validación para verificar si el DNI ya está en uso
      const responsePacientes = await fetch("/pacientes");
      if (!responsePacientes.ok)
        throw new Error("Error al verificar pacientes existentes");

      const pacientes = await responsePacientes.json();
      const pacienteExistente = pacientes.find(
        (paciente) => paciente.DNI === DNI
      );

      if (pacienteExistente) {
        alert("Este DNI ya está en uso.");
        return;
      }

      // Paso 1: Crear usuario
      const responseUsuario = await fetch("/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario: datosContacto,
          contrasena: contrasenaRegistro,
        }),
      });

      if (!responseUsuario.ok) throw new Error("Error al crear usuario");
      const usuarioData = await responseUsuario.json();
      const idUsuario = usuarioData.id;

      // Paso 2: Crear paciente con el ID del usuario recien creado
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("DNI", DNI);
      formData.append("obraSocial", obraSocial);
      formData.append("datosContacto", datosContacto);
      formData.append("fotocopiaDNI", fotocopiaDni); 
      formData.append("idUsuario", idUsuario);
    
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      

      const responsePaciente = await fetch("/pacientes", {
        method: "POST",
        body: formData,
      });

      if (!responsePaciente.ok) throw new Error("Error al crear paciente");

      // limpiar campos
      exito.style.display = "block";
      exito.showModal();
      setTimeout(() => {
        exito.close();
        exito.style.display = "none";
      }, 3000);

      limpiarCampos();
      modal.close();
      window.location.href = "/";
    } catch (error) {
      console.error("Error al registrar el paciente: ", error);
    }
  });
} else {
  console.error("Elementos no encontrados en el DOM");
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("obraSocial").value = "";
  document.getElementById("datosContacto").value = "";
  document.getElementById("contrasenaRegistro").value = "";
  document.getElementById("fotocopiaDni").value = ""; 
}
