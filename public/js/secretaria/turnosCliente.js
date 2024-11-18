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

        botonTurno.dataset.idTurno = turno.idTurno || "";
        botonTurno.dataset.dia = dia; // Agregar el día en el dataset

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

        botonTurno.addEventListener("click", () => {
          if (botonTurno.textContent === "Libre") {
            abrirModalCargaTurno(botonTurno);
          }
        });

        tdDia.appendChild(botonTurno);
      } else {
        tdDia.textContent = "";
      }

      tr.appendChild(tdDia);
    });

    datos.appendChild(tr);
  }
}

function abrirModalCargaTurno(boton) {
  botonSeleccionado = boton;
  const turnoId = boton.dataset.idTurno;
  const nuevaCargaTurno = document.getElementById(`enviar-form-cargaTurno`);
  const modalCargaTurno = document.getElementById(`modal-cargaTurno`);
  const sugerencia = document.getElementById("sugerencias-dni");
  const inputDNI = document.getElementById("dni");
  modalCargaTurno.showModal();

  autocomplete(inputDNI, sugerencia, "/pacientes");

  nuevaCargaTurno.addEventListener("click", (event) => {
    event.preventDefault();
    confirmarTurno(turnoId);
  });

  window.onclick = function (event) {
    if (event.target === modalCargaTurno) {
      modalCargaTurno.close();
    }
  };
}

async function confirmarTurno(turnoId) {
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombreTurno").value;
  const apellido = document.getElementById("apellido").value;
  const motivo = document.getElementById("motivo").value;
  const obraSocial = document.getElementById("obra").value;
  const exito = document.getElementById("exito-turnos");

  if (!turnoId) {
    console.error("No se encontró idTurno para confirmar el turno");
    return;
  }

  try {
    const responsePa = await fetch("/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        DNI: dni,
        obraSocial,
      }),
    }); // Verifica si la respuesta es correcta
    const resultado = await responsePa.json();

    const datitas = await fetch("/turno/estado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idEstadoHorario: 4,
        idTurno: turnoId,
      }),
    });
    const turnoconfi = await datitas.json();

    if (responsePa.ok && datitas.ok) {
      document.getElementById("modal-cargaTurno").close();

      if (botonSeleccionado) {
        exito.style.display = "block";
        exito.showModal();

        botonSeleccionado.textContent = "Confirmado";
        botonSeleccionado.style.backgroundColor = "green";
      }

      setTimeout(() => {
        exito.close();
        exito.style.display = "none";
      }, 3000);
    } else {
      console.error("Error al confirmar el turno en el servidor");
    }
  } catch (error) {
    console.error("Error al confirmar turno:", error);
  }
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
