botonRegistrar.addEventListener("click", async function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const DNI = parseInt(document.getElementById("dni").value.trim(), 10);
  const obraSocial = document.getElementById("obraSocial").value.trim();
  const datosContacto = document.getElementById("datosContacto").value.trim();
  const contrasenaRegistro = document.getElementById("contrasenaRegistro").value.trim();
  const fotocopiaDNI = document.getElementById("fotocopiaDNI").files[0];

  // Validaciones
  if (!nombre || !apellido || !DNI || !datosContacto || !contrasenaRegistro || !fotocopiaDNI) {
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
    // Crear un FormData para enviar los datos
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("DNI", DNI);
    formData.append("obraSocial", obraSocial);
    formData.append("datosContacto", datosContacto);
    formData.append("contrasena", contrasenaRegistro);
    formData.append("fotocopiaDNI", fotocopiaDNI);

    // Paso 1: Crear usuario
    const responseUsuario = await fetch("/usuarios", {
      method: "POST",
      body: JSON.stringify({
        nombreUsuario: datosContacto,
        contrasena: contrasenaRegistro,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!responseUsuario.ok) throw new Error("Error al crear usuario");
    const usuarioData = await responseUsuario.json();
    const idUsuario = usuarioData.id;

    // Paso 2: Crear paciente con el ID del usuario recién creado
    formData.append("idUsuario", idUsuario);  // Agregar el ID de usuario a FormData

    const responsePaciente = await fetch("/pacientes", {
      method: "POST",
      body: formData, // Enviar los datos incluyendo el archivo
    });

    if (!responsePaciente.ok) throw new Error("Error al crear paciente");

    // Mostrar mensaje de éxito y limpiar campos
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
