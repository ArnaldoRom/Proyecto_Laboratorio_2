let dataTableTurnoSecretaria;
let dataTableTurnoSecretariaInicializado = false;

const TurnoSecretariaOpciones = {
  destroy: true,
  pageLength: 6,
  language: {
    url: "/js/dataTable/es_AR.json",
  },
  scrollX: true, // Permite el desplazamiento horizontal si es necesario
};
const iniciarDataTableTurnoSecretaria = async () => {
  if (dataTableTurnoSecretariaInicializado) {
    dataTableTurnoSecretaria.destroy();
  }
  // await listaSucursales();

  dataTableTurnoSecretaria = $("#tabla-turno").DataTable(
    TurnoSecretariaOpciones
  );

  dataTableTurnoSecretariaInicializado = true;
};

async function turnoAgenda(idAgenda) {
  try {
    const response = await fetch(`/agenda/${idAgenda}`);
    if (!response.ok) throw new Error("Error al obtener la agenda");

    const agenda = await response.json();
    const datos = agenda[0];

    if (datos) {
      document.getElementById(
        "nombre"
      ).value = `${datos.nombrePro} ${datos.apellidoPro}`;
      document.getElementById("especialidad").value = datos.nombreEsp;

      // Filtrar y obtener los días disponibles
      const diasAgenda = datos.dia
        .split(",") // Dividir la cadena "1,4"
        .map((dia) => parseInt(dia.trim(), 10)); // Convertir cada valor a número

      await obtenerTurnos(idAgenda, diasAgenda); // Pasar los días disponibles a la función
    } else {
      console.error("No se encontró la agenda");
    }
  } catch (error) {
    console.error("Error al obtener los datos de la agenda: ", error);
  }
}

async function obtenerTurnos(idAgenda, diasAgenda) {
  try {
    const response = await fetch(`/turno/agenda/${idAgenda}`);
    if (!response.ok) throw new Error("Error al obtener Turnos");

    const turnos = await response.json();
    cargarTablaTurnos(turnos, diasAgenda); // Pasar los días disponibles y turnos a la función
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
  }
}

async function cargarTablaTurnos(turnos, diasAgenda) {
  const datos = document.querySelector("#tabla-turno tbody");

  if (!datos) {
    console.error("No se encontró el tbody, revisa la estructura HTML.");
    return;
  }

  datos.innerHTML = ""; // Limpiar el contenido de la tabla

  const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes"];
  const diasIndices = {
    1: "lunes",
    2: "martes",
    3: "miércoles",
    4: "jueves",
    5: "viernes",
  };

  let turnosPorHora = {};
  turnos.forEach((turno) => {
    if (turno.hora) {
      if (!turnosPorHora[turno.hora]) {
        turnosPorHora[turno.hora] = {};
      }
      const dia = diasIndices[turno.diaTurno];
      if (diasAgenda.includes(parseInt(turno.diaTurno))) {
        turnosPorHora[turno.hora][dia] = turno;
      }
    }
  });

  for (let hora in turnosPorHora) {
    const tr = document.createElement("tr");

    const tdHora = document.createElement("td");
    tdHora.textContent = hora;
    tr.appendChild(tdHora);

    diasSemana.forEach((dia) => {
      const tdDia = document.createElement("td");

      if (
        diasAgenda.includes(
          parseInt(
            Object.keys(diasIndices).find((key) => diasIndices[key] === dia)
          )
        )
      ) {
        const turno = turnosPorHora[hora][dia] || { idEstadoHorario: 2 };

        const botonTurno = document.createElement("button");
        botonTurno.style.width = "100%";
        botonTurno.style.border = "none";
        botonTurno.style.cursor = "pointer";

        switch (turno.idEstadoHorario) {
          case 2:
            botonTurno.textContent = "Libre";
            botonTurno.style.backgroundColor = "gray";
            break;
          case 3:
            botonTurno.textContent = "Reservado";
            botonTurno.style.backgroundColor = "yellow";
            break;
          case 4:
            botonTurno.textContent = "Confirmado";
            botonTurno.style.backgroundColor = "green";
            break;
          default:
            botonTurno.textContent = "Desconocido";
            botonTurno.style.backgroundColor = "white";
            break;
        }

        tdDia.appendChild(botonTurno);
      } else {
        tdDia.textContent = "";
      }

      tr.appendChild(tdDia);
    });

    datos.appendChild(tr);
  }

  // Agregar eventos a los botones después de generar la tabla
  abrirModalCargaTurno();
}

function abrirModalCargaTurno() {
  const nuevaCargaTurno = document.getElementById(`enviar-form-cargaTurno`);
  const modalCargaTurno = document.getElementById(`modal-cargaTurno`);
  const botones = document.querySelectorAll("#tabla-turno tbody td button");

  botones.forEach((boton) => {
    if (boton.textContent === "Libre") {
      boton.addEventListener("click", () => {
        modalCargaTurno.showModal();
      });
    }
  });

  nuevaCargaTurno.addEventListener("click", (event) => {
    event.preventDefault();
    confirmarTurno();
  });

  window.onclick = function (event) {
    if (event.target === modalCargaTurno) {
      modalCargaTurno.close();
    }
  };
}

async function confirmarTurno() {
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const motivo = document.getElementById("motivo").value;
  const obraSocial = document.getElementById("obra").value;
  const exito = document.getElementById("exito-turnos");

  try {
    const response = await fetch("/", {
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

    if (!response.ok) throw new Error("Error al confirmar turno");

    document.getElementById("modal-cargaTurno").close();
    exito.style.display = "block";
    exito.showModal();
    setTimeout(() => {
      exito.close();
      exito.style.display = "none";
    }, 3000);
  } catch (error) {}
}

// function buscarTurnoSecretario() {
//   const enviar = document.getElementById("enviar-form-turno");

//   enviar.addEventListener("click", async (event) => {
//     event.preventDefault();
//     const turnos = await obtenerTurnos(idAgenda);

//     if (window.miCalendarioTurno) {
//       window.miCalendarioTurno.removeAllEvents();
//       if (turnos) {
//         window.miCalendarioTurno.addEventSource(turnos);
//       }
//     }
//   });
// }

function autocompletar(input, datos) {
  // Crea un contenedor para las sugerencias de autocompletado
  const contenedor = document.createElement("div");
  contenedor.classList.add("contenedor-sugerencias");
  input.parentNode.appendChild(contenedor);

  // Agrega un evento de escucha para cuando el usuario escribe en el campo
  input.addEventListener("input", function () {
    const valor = this.value;
    contenedor.innerHTML = "";

    if (!valor) return;

    // Filtra los datos que coinciden con el valor del input
    const sugerencias = datos.filter((item) =>
      item.toLowerCase().includes(valor.toLowerCase())
    );

    // Muestra cada sugerencia en el contenedor
    sugerencias.forEach((sugerencia) => {
      const item = document.createElement("div");
      item.classList.add("sugerencia");
      item.textContent = sugerencia;

      // Cuando se hace clic en una sugerencia, se rellena el input
      item.addEventListener("click", function () {
        input.value = sugerencia;
        contenedor.innerHTML = ""; // Limpiar sugerencias
      });

      contenedor.appendChild(item);
    });
  });

  // Ocultar las sugerencias cuando se hace clic fuera
  document.addEventListener("click", function (e) {
    if (!contenedor.contains(e.target) && e.target !== input) {
      contenedor.innerHTML = "";
    }
  });
}
