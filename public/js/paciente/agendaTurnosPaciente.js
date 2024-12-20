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

function buscarAgenda() {
  const botonBuscar = document.getElementById("enviar-form-turno");

  botonBuscar?.addEventListener("click", async (event) => {
    event.preventDefault();

    const inputNombre = document.getElementById("nombre");
    const inputEspecialidad = document.getElementById("especialidad");

    if (!inputNombre && !inputEspecialidad) {
      console.error("No se encontraron los campos de nombre o especialidad en el DOM.");
      return;
    }

    const nombre = inputNombre ? inputNombre.value : "";
    const especialidad = inputEspecialidad ? inputEspecialidad.value : "";

    try {
      let url = "/agenda?";
      let queryParams = [];

      if (especialidad) {
        url += `especialidad=${especialidad}&`;
      }

      if (nombre) {
        url += `nombre=${nombre}&`;
      }

      url = url.slice(0, -1);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No se pudo obtener la agenda.");
      }

      const agendas = await response.json();
      if (agendas.length > 0) {
        const idAgenda = agendas[0].idAgenda;
        turnoPaciente(idAgenda);
      } else {
        console.error("No se encontró ninguna agenda.");
      }
    } catch (error) {
      //agregar un dialog para mostrar el error
      console.error("Error al buscar agenda:", error);
    }
  });
}

async function turnoPaciente(idAgenda) {
  try {
    const response = await fetch(`/agenda/${idAgenda}`);
    if (!response.ok) throw new Error("Error al obtener la agenda");

    const agenda = await response.json();
    const datos = agenda[0];

    if (datos) {
      document.getElementById("nombre").value = `${datos.nombrePro} ${datos.apellidoPro}`;
      document.getElementById("especialidad").value = datos.nombreEsp;

      const diasTurno = datos.dia.split(",").map((dia) => parseInt(dia.trim(), 10));
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
  const diasIndices = { 1: "lunes", 2: "martes", 3: "miércoles", 4: "jueves", 5: "viernes" };

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

      if (diasTurno.includes(parseInt(Object.keys(diasIndices).find((key) => diasIndices[key] === dia)))) {
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

async function solicitarTurno(turno) {
  const nombreUsuario = document.querySelector(".header p").textContent.trim();

  try {
    const responsePaciente = await fetch(`/usuario/obtenerPaciente?nombreUsuario=${nombreUsuario}`);
    if (!responsePaciente.ok) throw new Error("No se pudo obtener el ID del paciente.");

    const { idPaciente } = await responsePaciente.json();

    const response = await fetch("/turno/estado/reservado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idTurno: turno.idTurno, idPaciente: idPaciente }),
    });

    if (!response.ok) throw new Error("Error al cambiar el estado del turno.");

    const modalCargaTurnoPaciente = document.getElementById("exito-turnos");
    modalCargaTurnoPaciente.showModal();
    console.log("Turno reservado con éxito:", turno);

    
    const diasTurno = Object.keys(turnosPorHora[turno.hora]);
    const idAgenda = turno.idAgenda; 
    await obtenerTurnos(idAgenda, diasTurno);

    setTimeout(() => {
      modalCargaTurnoPaciente.close();
    }, 2000);
  } catch (error) {
    console.error("Error al solicitar turno:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarDataTableTurnoPaciente();
  buscarAgenda();
});
