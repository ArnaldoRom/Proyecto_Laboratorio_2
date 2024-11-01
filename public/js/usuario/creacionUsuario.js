// creacionUsuario.js
import { 
  validarCamposCompletos, 
  validarDNI, 
  validarContrasena, 
  validarDatosContacto 
} from '.validacion.js';

document.addEventListener('DOMContentLoaded', function () {
  const abrirModal = document.getElementById('abrir-modal');
  const modal = document.getElementById('modal');
  const exito = document.getElementById('exito');
  const botonRegistrar = document.getElementById('boton-registrar');

  if (abrirModal && modal && exito && botonRegistrar) {
    abrirModal.addEventListener('click', () => modal.showModal());

    botonRegistrar.addEventListener('click', async function (event) {
      event.preventDefault();

      // Obtener valores de los campos
      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const dni = parseInt(document.getElementById('dni').value.trim(), 10);
      const obraSocial = document.getElementById('obraSocial').value.trim();
      const datosContacto = document.getElementById('datosContacto').value.trim();
      const contrasenaRegistro = document.getElementById('contrasenaRegistro').value.trim();

      // Validar todos los campos antes de continuar
      if (
        validarCamposCompletos({ nombre, apellido, dni, obraSocial, datosContacto, contrasenaRegistro }) &&
        validarDNI(dni) && validarContrasena(contrasenaRegistro) && validarDatosContacto(datosContacto)
      ) {
        try {
          // Crear usuario y paciente
          await crearUsuarioYPaciente({ nombre, apellido, dni, obraSocial, datosContacto, contrasenaRegistro, exito });
        } catch (error) {
          console.error('Error al registrar el paciente: ', error);
          if (error instanceof Response) {
            const errorText = await error.text();
            console.error('Detalles del error:', errorText);
          }
        }
      }
    });
  } else {
    console.error('Elementos no encontrados en el DOM');
  }
});

// Función para la creación de usuario y paciente
async function crearUsuarioYPaciente({ nombre, apellido, dni, obraSocial, datosContacto, contrasenaRegistro, exito }) {
  const responseUsuario = await fetch('/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombreUsuario: dni,
      contrasena: contrasenaRegistro,
    }),
  });

  if (!responseUsuario.ok) throw new Error('Error al crear usuario');
  const usuarioData = await responseUsuario.json();
  const idUsuario = usuarioData.id;

  const responsePaciente = await fetch('/pacientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre,
      apellido,
      dni,
      obraSocial,
      datosContacto,
      idUsuario,
    }),
  });

  if (!responsePaciente.ok) throw new Error('Error al crear paciente');

  // Mostrar mensaje de éxito
  exito.style.display = 'block';
  exito.showModal();
  setTimeout(() => {
    exito.close();
    exito.style.display = 'none';
  }, 3000);

  // Limpiar campos
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('dni').value = '';
  document.getElementById('obraSocial').value = '';
  document.getElementById('datosContacto').value = '';
  document.getElementById('contrasenaRegistro').value = '';

  // Redirigir
  //window.location.href = '/vista-paciente';
}

  