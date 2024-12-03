async function registrarPaciente() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("DNI").value;
  const obraSocial = document.getElementById("obra-social").value;
  const email = document.getElementById("datos-contacto").value;
  const exito = document.getElementById("exito-nuevoPaciente");
  const usuario = `${email}`;
  const contra = `${nombre}123`;

  try {
    const responseUser = await fetch("/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreUsuario: usuario,
        contrasena: contra,
      }),
    });

    if (!responseUser.ok) throw new Error("Error al crear usuario");

    const data = await responseUser.json();
    const idUsuario = data.id;
    console.log(idUsuario);

    const resPaciente = await fetch("/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        DNI: dni,
        obraSocial,
        datosContacto: email,
        idUsuario,
      }),
    });

    if (!resPaciente.ok) throw new Error("Error al crear paciente");

    exito.style.display = "block";
    exito.showModal();
    setTimeout(() => {
      exito.close();
      exito.style.display = "none";
    }, 3000);
    limpiar();
  } catch (error) {}
}

function registrar() {
  const agregar = document.getElementById("enviar-form-nuevoPaciente");

  agregar.addEventListener("click", (event) => {
    event.preventDefault();
    registrarPaciente();
  });
}

function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("DNI").value = "";
  document.getElementById("obra-social").value = "";
  document.getElementById("datos-contacto").value = "";
}
