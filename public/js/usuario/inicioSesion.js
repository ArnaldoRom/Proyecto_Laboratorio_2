const form = document.querySelector(".contenedor-login form");
const usuarioInput = document.getElementById("usuario");
const contrasenaInput = document.getElementById("contrasena");

if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const contrasena = contrasenaInput.value.trim();

    // Validaciones
    if (!usuario || !contrasena) {
      alert("Usuario y contraseña son obligatorios.");
      return;
    }

    try {
      // Realiza la solicitud de inicio de sesión
      const response = await fetch("/iniciar-sesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario: usuario,
          contrasena: contrasena,
        }),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const data = await response.json();
      console.log("Datos recibidos:", data); // Log adicional

      // Redirigir según el rol
      if (data.rol) {
        console.log("Redirigiendo a la vista:", data.rol); // Log de redirección
        switch (data.rol) {
          case "Administrador":
            window.location.href = "/vistaAdministradora";
            break;
          case "Paciente":
            window.location.href = "/vistaPaciente";
            break;
          case "Secretaria":
            window.location.href = "/vistaSecretaria";
            break;
          case "Profesional":
            window.location.href = "/vistaProfecional";
            break;
          default:
            console.error("El rol no es correcto", data.rol);
            alert("Rol no reconocido.");
        }
      } else {
        console.error("No se recibió el rol en la respuesta.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(error.message);
    }
  });
} else {
  console.error("Formulario de inicio de sesión no encontrado");
}
