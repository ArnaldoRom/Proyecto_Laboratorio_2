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

      const diasAgenda = datos.dia
        .split(",")
        .map((dia) => parseInt(dia.trim(), 10));

      await obtenerTurnos(idAgenda, diasAgenda);
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
    cargarTablaTurnos(turnos, diasAgenda);
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

        botonTurno.dataset.idTurno = turno.idTurno || "";
        botonTurno.dataset.dia = dia;

        switch (turno.idEstadoHorario) {
          case 2:
            botonTurno.textContent = "Libre";
            botonTurno.style.backgroundColor = "gray";
            botonTurno.addEventListener("click", () => {
              abrirModalCargaTurno(botonTurno);
            });
            break;
          case 3:
            botonTurno.textContent = "Reservado";
            botonTurno.style.backgroundColor = "yellow";
            break;
          case 4:
            botonTurno.textContent = "Confirmado";
            botonTurno.style.backgroundColor = "green";
            botonTurno.addEventListener("click", () => {
              abrirModalInfo(botonTurno);
            });
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
}

let nuevoEvento;

function abrirModalCargaTurno(boton) {
  botonSeleccionado = boton;
  const turnoId = boton.dataset.idTurno;
  const nuevaCargaTurno = document.getElementById(`enviar-form-cargaTurno`);
  const modalCargaTurno = document.getElementById(`modal-cargaTurno`);
  const sugerencia = document.getElementById("sugerencias-dni");
  const nuevoPaciente = document.getElementById("enviar-form-paciente");
  const inputDNI = document.getElementById("dni");
  modalCargaTurno.showModal();
  limpiarCamposModal();

  const filtroDni = (data, inputValue) =>
    data.DNI.toString().startsWith(inputValue);
  const filtroData = (data) => data.DNI;

  const seleccionPaciente = (paciente) => {
    document.getElementById("nombreTurno").value = paciente.nombre || "";
    document.getElementById("apellido").value = paciente.apellido || "";
    document.getElementById("obra").value = paciente.obraSocial || "";
  };

  autocomplete(
    inputDNI,
    sugerencia,
    "/pacientes",
    filtroDni,
    filtroData,
    seleccionPaciente
  );

  if (nuevoEvento) {
    nuevaCargaTurno.removeEventListener("click", nuevoEvento);
  }

  nuevoEvento = async (event) => {
    event.preventDefault();
    await confirmarTurno(turnoId);
  };

  nuevaCargaTurno.addEventListener("click", nuevoEvento);

  nuevoPaciente.addEventListener("click", (event) => {
    event.preventDefault();
    mostrar("paciente");
    modalCargaTurno.close();
  });

  window.onclick = function (event) {
    if (event.target === modalCargaTurno) {
      modalCargaTurno.close();
    }
  };
}

async function confirmarTurno(turnoId) {
  const dni = document.getElementById("dni").value;
  const motivo = document.getElementById("motivo").value;
  const clasificacion = document.getElementById("clasificacion").value;
  const exitoConfirmadoTurno = document.getElementById("exito-turnos");

  console.log(turnoId);
  if (!turnoId) {
    console.error("No se encontró idTurno para confirmar el turno");
    return;
  }

  try {
    const paciente = await fetch(`/paciente/${dni}`);
    const resultado = await paciente.json();

    const datitas = await fetch("/turno/reservar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clasificacion,
        idPaciente: resultado.idPaciente,
        motivoConsulta: motivo,
        idTurno: turnoId,
      }),
    });
    const turnoconfi = await datitas.json();

    if (paciente.ok && datitas.ok) {
      document.getElementById("modal-cargaTurno").close();

      if (botonSeleccionado) {
        botonSeleccionado.textContent = "Confirmado";
        botonSeleccionado.style.backgroundColor = "green";
      }

      exitoConfirmadoTurno.style.display = "block";
      exitoConfirmadoTurno.showModal();

      setTimeout(() => {
        exitoConfirmadoTurno.close();
        exitoConfirmadoTurno.style.display = "none";
      }, 3000);
    } else {
      console.error("Error al confirmar el turno en el servidor");
    }
  } catch (error) {
    console.error("Error al confirmar turno:", error);
  }
}

async function abrirModalInfo(boton) {
  const idInfo = boton.dataset.idTurno;
  const modalInfo = document.getElementById("modal-infoPaciente");
  const info = document.getElementById("info-turno");
  const cerrar = document.getElementById("cerrar-info");
  modalInfo.showModal();

  try {
    const infoTurno = await fetch(`/turno/${idInfo}`);
    if (!infoTurno.ok) throw new Error("Error al buscar info");

    const datosTurno = await infoTurno.json();
    const Turnos = datosTurno[0];

    info.innerHTML = `
      <p><strong>DNI:</strong> ${Turnos.DNI}</p>
      <p><strong>Nombre:</strong> ${Turnos.nombre}</p>
      <p><strong>Apellido:</strong> ${Turnos.apellido}</p>
      <p><strong>Motivo Consulta:</strong> ${Turnos.motivoConsulta}</p>
      <p><strong>Clasificación:</strong> ${Turnos.clasificacion}</p>
      <p><strong>Obra Social:</strong> ${Turnos.obraSocial}</p>
      <p><strong>Hora:</strong> ${Turnos.hora}</p>
      <p><strong>Día:</strong> ${Turnos.dia}</p>
      <p><strong>Médico:</strong> ${Turnos.nombrePro}${Turnos.apellidoPro}</p>
    `;

    cerrar.addEventListener("click", () => {
      modalInfo.close();
    });
  } catch (error) {
    console.error("Error al obener info del Turno", error);
  }

  window.onclick = function (event) {
    if (event.target === modalInfo) {
      modalInfo.close();
    }
  };
}

function limpiarCamposModal() {
  document.getElementById("dni").value = "";
  document.getElementById("nombreTurno").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("obra").value = "";
  document.getElementById("motivo").value = "";
  document.getElementById("clasificacion").value = "";
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
