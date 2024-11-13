let dataTableTurnoPaciente;
let dataTableTurnoPacienteInicializado = false;

const TurnoPacienteOpciones = {
  destroy: true,
  pageLength: 6,
  language: {
    url: "/js/dataTable/es_AR.json",
  },
  scrollX: true,
};

const iniciarDataTableTurnoPaciente = async () => {
  if (dataTableTurnoPacienteInicializado) {
    dataTableTurnoPaciente.destroy();
  }
  dataTableTurnoPaciente = $("#tabla-turno").DataTable(TurnoPacienteOpciones);
  dataTableTurnoPacienteInicializado = true;
};

// Función para buscar el ID de la agenda por especialidad o nombre del profesional
async function buscarAgenda() {
  const nombreProfesional = document.getElementById("nombre").value.trim();
  const especialidadProfesional = document
    .getElementById("especialidad")
    .value.trim();
  const diaSeleccionado = 0; // Puedes cambiar este valor o hacerlo dinámico según lo necesites

  // Crear un objeto para los parámetros de búsqueda
  const queryParams = new URLSearchParams();

  // Solo agregar parámetros que tengan valores válidos
  if (nombreProfesional) queryParams.append("nombre", nombreProfesional);
  if (especialidadProfesional)
    queryParams.append("especialidad", especialidadProfesional);
  queryParams.append("dia", diaSeleccionado); // Si dia es obligatorio, no necesita validación

  const url = `/agenda?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener la agenda");

    const agendas = await response.json();
    if (agendas.length > 0) {
      const idAgenda = agendas[0].id; // Supongo que cada agenda tiene un id
      turnoAgenda(idAgenda); // Pasar el ID de la agenda a la función turnoAgenda
    } else {
      console.log("No se encontraron agendas con los criterios especificados.");
    }
  } catch (error) {
    console.error("Error al buscar la agenda:", error);
  }
}

async function turnoPaciente(idAgenda) {
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

      const diasTurno = datos.dia
        .split(",")
        .map((dia) => parseInt(dia.trim(), 10));
      await obtenerTurnos(idAgenda, diasTurno);
    } else {
      console.error("No se encontró la agenda");
    }
  } catch (error) {
    console.error("Error al obtener los datos de la agenda: ", error);
  }
}

async function obtenerTurnos(idAgenda, diasTurno) {
  try {
    const response = await fetch(`/turno/agenda/${idAgenda}`);
    if (!response.ok) throw new Error("Error al obtener Turnos");

    const turnos = await response.json();
    cargarTablaTurnos(turnos, diasTurno);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
  }
}

async function cargarTablaTurnos(turnos, diasTurno) {
  const datos = document.querySelector("#tabla-turno tbody");

  if (!datos) {
    console.error("No se encontró el tbody, revisa la estructura HTML.");
    return;
  }

  datos.innerHTML = "";

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
      if (diasTurno.includes(parseInt(turno.diaTurno))) {
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
        diasTurno.includes(
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

        if (turno.idEstadoHorario === 2) {
          botonTurno.textContent = "Libre";
          botonTurno.style.backgroundColor = "gray";
          botonTurno.addEventListener("click", () => solicitarTurno(turno));
        } else if (turno.idEstadoHorario === 3) {
          botonTurno.textContent = "Reservado";
          botonTurno.style.backgroundColor = "yellow";
          botonTurno.disabled = true;
        } else {
          botonTurno.textContent = "Desconocido";
          botonTurno.style.backgroundColor = "white";
          botonTurno.disabled = true;
        }

        tdDia.appendChild(botonTurno);
      } else {
        tdDia.textContent = "";
      }

      tr.appendChild(tdDia);
    });

    datos.appendChild(tr);
  }
}

function solicitarTurno(turno) {
  const modalCargaTurnoPaciente = document.getElementById("exito-turnos");
  modalCargaTurnoPaciente.showModal();
  console.log("Solicitando turno:", turno);
  setTimeout(() => {
    modalCargaTurnoPaciente.close();
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  const botonBuscar = document.getElementById("enviar-form-turno");

  botonBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    buscarAgendaID();
  });
});
