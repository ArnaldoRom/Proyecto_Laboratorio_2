// validaciones.js
export function validarCamposCompletos(campos) {
    const { nombre, apellido, dni, obraSocial, datosContacto, contrasenaRegistro } = campos;
    if (!nombre || !apellido || !dni || !obraSocial || !datosContacto || !contrasenaRegistro) {
      alert("Todos los campos deben estar completos.");
      return false;
    }
    return true;
  }
  
  export function validarDNI(dni) {
    if (isNaN(dni)) {
      alert("El campo DNI debe ser un número válido.");
      return false;
    }
    return true;
  }
  
  export function validarContrasena(contrasena) {
    if (contrasena.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    return true;
  }
  
  export function validarDatosContacto(datosContacto) {
    if (!datosContacto.includes('@') || !datosContacto.endsWith('.com')) {
      alert("El campo de contacto debe contener un '@' y terminar en '.com'.");
      return false;
    }
    return true;
  }
  