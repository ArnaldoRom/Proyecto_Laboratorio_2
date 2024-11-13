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

async function turnoPaciente(idTurno) {
  console.log("idTurno:", idTurno);
  try {
    const response = await fetch(`/turno/${idTurno}`);
    if (!response.ok) throw new Error("Error al obtener el turno");

    const turno = await response.json();
    const datos = turno[0];

    if (datos) {
      document.getElementById("nombre").value = `${datos.nombrePro} ${datos.apellidoPro}`;
      document.getElementById("especialidad").value = datos.nombreEsp;

      const diasTurno = datos.dia.split(",").map((dia) => parseInt(dia.trim(), 10));
      await obtenerTurnosPaciente(idTurno, diasTurno);
    } else {
      console.error("No se encontró el turno");
    }
  } catch (error) {
    console.error("Error al obtener los datos del turno: ", error);
  }
}

async function obtenerTurnosPaciente(idTurno, diasTurno) {
  try {
    const response = await fetch(`/turno/agenda/${idTurno}`);
    if (!response.ok) throw new Error("Error al obtener Turnos");

    const turnos = await response.json();
    cargarTablaTurnosPaciente(turnos, diasTurno);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
  }
}

async function cargarTablaTurnosPaciente(turnos, diasTurno) {
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
    event.preventDefault(); // Prevenir el envío del formulario
    turnoPaciente(); // Llama a la función que obtiene los turnos del paciente
  });
});

