let dataTableEmpleado;
let dataTableEmpleadoInicializado = false;

const empleadoOpciones = {
  destroy: true,
  pageLength: 10,
  language: {
    url: "/js/dataTable/es_AR.json",
  },
};
const iniciarDataTableEmpleado = async () => {
  if (dataTableEmpleadoInicializado) {
    dataTableEmpleado.destroy();
  }
  await listaEmpleado();

  dataTableEmpleado = $("#tabla-empleado").DataTable(empleadoOpciones);

  dataTableEmpleadoInicializado = true;
};

async function listaEmpleado() {
  try {
    const response = await fetch(`/empleados`);

    if (!response.ok) throw new Error("Error al obtener Empleados");

    const empleados = await response.json();
    cargarEmpleados(empleados);
  } catch (error) {
    console.error("Error al obtener empleados: ", error);
  }
}

function cargarEmpleados(empleados) {
  const datos = document.querySelector("#tabla-empleados tbody");

  if (!datos) {
    console.error("No se encontró el tbody, revisa la estructura HTML.");
    return;
  }
  datos.innerHTML = "";

  empleados.forEach((empleado) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${empleado.nombreEmpleado}</td>
      <td>${empleado.apellido}</td>
      <td>${empleado.numeroLegajo}</td>
      <td>${empleado.nombre}</td>
      <td>${empleado.nombreUsuario}</td>
    `;
    datos.appendChild(tr);
  });
}

async function cargarSucursalesEmpleados() {
  try {
    const response = await fetch("/gestion/sucursal");
    if (!response.ok) throw new Error("Error al obtener sucursales");
    const sucursales = await response.json();
    const selectSucursales = document.getElementById("sucursales");
    if (!selectSucursales) {
      console.error(
        "No se encontró el select con el ID 'especialidad', revisa la estructura HTML."
      );
      return;
    }
    sucursales.forEach((sucursal) => {
      const option = document.createElement("option");
      option.value = sucursal.idSucursal;
      option.textContent = sucursal.nombre;
      selectSucursales.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar especialidades: ", error);
  }
}

async function registrarEmpleado() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const legajo = document.getElementById("legajo").value;
  const sucursal = parseInt(document.getElementById("sucursales").value, 10);
  const exito = document.getElementById("exito-empleado");
  const nombreUsuario = `User${nombre}`;
  const contrasena = `clinica${apellido}`;
  const rol = "Secretaria";

  try {
    const responseUsuario = await fetch("/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreUsuario,
        contrasena,
        rol,
      }),
    });

    if (!responseUsuario.ok) throw new Error("Error al crear usuario");

    const idUsuario = await responseUsuario.json();

    const responseEmpleado = await fetch("/empleados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreEmpleado: nombre,
        apellido,
        numeroLegajo: legajo,
        idSucursal: sucursal,
        idUsuario: idUsuario.id,
      }),
    });

    if (!responseEmpleado.ok) throw new Error("Error al crear empleado");

    await listaEmpleado();
    document.getElementById("modal-empleado").close();
    exito.style.display = "block";
    exito.showModal();
    setTimeout(() => {
      exito.close();
      exito.style.display = "none";
    }, 3000);
  } catch (error) {}
}

function abrirModalEmpleado() {
  const agregarEmpleado = document.getElementById(`abrir-modal-empleado`);
  const nuevaEmpleado = document.getElementById(`enviar-form-empleado`);
  const modalEmpleado = document.getElementById(`modal-empleado`);

  agregarEmpleado.addEventListener("click", () => {
    modalEmpleado.showModal();
  });

  nuevaEmpleado.addEventListener("click", (event) => {
    event.preventDefault();
    registrarEmpleado();
  });

  modalEmpleado.addEventListener("click", (event) => {
    if (event.target === modalEmpleado) {
      modalEmpleado.close();
    }
  });
}
