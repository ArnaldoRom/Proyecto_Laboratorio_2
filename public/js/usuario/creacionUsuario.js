// Función para manejar el inicio de sesión
async function iniciarSesion(event) {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
  
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contrasena }),
      });
  
      if (response.ok) {
        window.location.href = "/dashboard"; // Redirige al dashboard o página de inicio
      } else {
        alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
    }
  }
  
  // Función para manejar el registro de usuario
async function registrarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const usuarioNuevo = document.getElementById("usuarioNuevo").value;
    const contrasenaNueva = document.getElementById("contrasenaNueva").value;
    const rol = "paciente"; 
  
    try {
      const response = await fetch("/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          usuarioNuevo,
          contrasenaNueva,
          rol,
        }),
      });
  
      if (response.ok) {
        document.getElementById("modal").close(); // Cierra el modal de registro
        document.getElementById("exito").showModal(); // Muestra el mensaje de éxito
        setTimeout(() => document.getElementById("exito").close(), 3000);
      } else {
        alert("Error al registrar usuario. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al registrar usuario: ", error);
    }
  }
  
  
  document.querySelector("form[action='/login']").addEventListener("submit", iniciarSesion);
  document.querySelector("form[action='/registro']").addEventListener("submit", registrarUsuario);
  

  document.getElementById("abrir-modal").onclick = () => {
    document.getElementById("modal").showModal();
  };
  
  
  document.getElementById("modal").addEventListener("close", () => {
    document.getElementById("modal").close();
  });
  