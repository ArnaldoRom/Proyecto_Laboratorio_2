const form = document.querySelector('.contenedor-login form');
const usuarioInput = document.getElementById('usuario');
const contrasenaInput = document.getElementById('contrasena');

if (form) {
  form.addEventListener('submit', async function (event) {
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
      const response = await fetch('/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: usuario,
          contrasena: contrasena,
        }),
      });

      if (!response.ok) throw new Error('Credenciales incorrectas');

      const data = await response.json();
      console.log('Datos recibidos:', data);

      // Redirigir según el rol
      if (data.rol === 'Administrador') {
        window.location.href = '/vista-administrador'; // Cambia esta ruta según tu configuración
      } else if (data.rol === 'Paciente') {
        window.location.href = '/vista-paciente'; // Cambia esta ruta según tu configuración
      } else {
        console.error('Rol no reconocido:', data.rol);
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error.message);
    }
  });
} else {
  console.error('Formulario de inicio de sesión no encontrado');
}

