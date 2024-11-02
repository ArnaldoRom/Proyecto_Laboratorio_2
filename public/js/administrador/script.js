let dataTableProfesional;
let dataTableProfesionalInicializado = false;

const profesionalOpciones = {
  destroy: true,
  pageLength: 10,
  language: {
    url: "/js/dataTable/es_AR.json",
  },
};
const iniciarDataTableProfesional = async () => {
  if (dataTableProfesionalInicializado) {
    dataTableProfesional.destroy();
  }
  await listaProfesionales();

  dataTableProfesional = $("#tabla-profesional").DataTable(profesionalOpciones);

  dataTableProfesionalInicializado = true;
};

async function listaProfesionales() {
  try {
    const response = await fetch("/profesionales-especializados");
    if (!response.ok) throw new Error("Error al obtener profesionales");
    const profesionales = await response.json();
    cargarProfesionales(profesionales);
  } catch (error) {
    console.error("Error al obtener profesionales: ", error);
  }
}
function crearUsuario(profesionales) {
  try {
  } catch (errir) {
    console.erroe("Error al crear usuario");
  }
}
//profesional.nombre, profesional.apellido, especialidad.nombre, matricula
function cargarProfesionales(profesionales) {
  const resultado = document.querySelector("#tabla-profesionales tbody");
  if (!resultado) {
    console.error("No se encontró el tbody, revisa la estructura HTML.");
    return;
  }
  resultado.innerHTML = "";
  profesionales.forEach((profesionalEspecializado) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
                    <td>${profesionalEspecializado.nombreProfesional}</td>                
                    <td>${profesionalEspecializado.apellido}</td>
                    <td>${profesionalEspecializado.nombre}</td>
                    <td>${profesionalEspecializado.matricula}</td>`;
    resultado.appendChild(tr);
  });
}

// Obtener y cargar especialidades en el select
async function cargarEspecialidades() {
  try {
    const response = await fetch("/especialidades");
    if (!response.ok) throw new Error("Error al obtener especialidades");
    const especialidades = await response.json();
    const selectEspecialidad = document.getElementById("especialidad");
    if (!selectEspecialidad) {
      console.error(
        "No se encontró el select con el ID 'especialidad', revisa la estructura HTML."
      );
      return;
    }
    especialidades.forEach((especialidad) => {
      const option = document.createElement("option");
      option.value = especialidad.idEspecialidad;
      option.textContent = especialidad.nombre;
      selectEspecialidad.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar especialidades: ", error);
  }
}

// Registrar profesional y su especialidad
async function registrarProfesional() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const idEspecialidad = parseInt(
    document.getElementById("especialidad").value,
    10
  );
  const matricula = document.getElementById("matricula").value;
  const exito = document.getElementById("exito");

  try {
    // Paso 1: Crear profesional
    const responseProfesional = await fetch("/profesionales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
      }),
    });

    if (!responseProfesional.ok) throw new Error("Error al crear profesional");

    // Obtener el ID del profesional recien creado
    const profesionalId = await responseProfesional.json();
    const idProfesional = profesionalId.id;

    // Paso 2: Crear relación en profesionalEspecializado
    const responseEspecializado = await fetch("/profesionales-especializados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idEspecialidad,
        idProfesional,
        matricula,
      }),
    });

    if (!responseEspecializado.ok)
      throw new Error("Error al asignar especialidad");

    // Paso 3: Crear el usuario automaticamente
    const nombreUsuario = apellido;
    const contrasena = `clinica${apellido}`;
    const rol = "profesional";

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

    // Actualizar la lista y mostrar mensaje de éxito
    await listaProfesionales();
    document.getElementById("modal").close();
    exito.style.display = "block";
    exito.showModal();
    setTimeout(() => {
      exito.close();
      exito.style.display = "none";
    }, 3000);
  } catch (error) {
    console.error("Error al registrar profesional: ", error);
  }
}

function abrirModalProfesional() {
  const agregarProfesional = document.getElementById("abrir-modal");
  const nuevoProfesional = document.getElementById("enviar-form");
  const modalProfesional = document.getElementById("modal");

  if (!agregarProfesional || !nuevoProfesional || !modalProfesional) {
    console.error(
      "No se encontraron los elementos necesarios para abrir el modal, revisa la estructura HTML."
    );
    return;
  }

  agregarProfesional.addEventListener("click", () => {
    modalProfesional.showModal();
  });

  nuevoProfesional.addEventListener("click", (event) => {
    event.preventDefault();
    registrarProfesional();
  });

  // Cerrar el modal si se hace clic fuera de él
  window.onclick = function (event) {
    if (event.target === modalProfesional) {
      modalProfesional.close();
    }
  };
}
