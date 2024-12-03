// Función para crear usuario
export async function crearUsuario(datosContacto, contrasenaRegistro) {
    console.log("Enviando datos para crear usuario...");
    const response = await fetch('/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario: datosContacto,
        contrasena: contrasenaRegistro,
      }),
    });
  
    if (!response.ok) throw new Error('Error al crear usuario');
    
    const usuarioData = await response.json();
    console.log("Usuario creado con ID:", usuarioData.id);
    
    return usuarioData.id; 
  }

  export async function crearPaciente({ nombre, apellido, dni, obraSocial, datosContacto, idUsuario }) {
    console.log("Enviando datos para crear paciente...");
    const response = await fetch('/pacientes', {
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
  
    if (!response.ok) throw new Error('Error al crear paciente');
    console.log("Paciente creado exitosamente");
  }