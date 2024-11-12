let dataTableTurnoSecretaria;
let dataTableTurnoSecretariaInicializado = false;

const TurnoSecretariaOpciones = {
  destroy: true,
  pageLength: 10,
  language: {
    url: "/js/dataTable/es_AR.json",
  },
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

  // Definir los días de la semana y los índices de los días en la tabla (lunes a viernes)
  const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes"];
  const diasIndices = {
    1: "lunes",
    2: "martes",
    3: "miércoles",
    4: "jueves",
    5: "viernes",
  };

  // Agrupar los turnos por hora y día
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

  // Crear filas por cada hora en turnosPorHora
  for (let hora in turnosPorHora) {
    const tr = document.createElement("tr");

    // Celda de hora
    const tdHora = document.createElement("td");
    tdHora.textContent = hora;
    tr.appendChild(tdHora);

    // Crear las celdas de cada día de la semana
    diasSemana.forEach((dia) => {
      const tdDia = document.createElement("td");

      // Si el día está en diasAgenda, mostrar el turno correspondiente o dejarlo libre
      if (
        diasAgenda.includes(
          parseInt(
            Object.keys(diasIndices).find((key) => diasIndices[key] === dia)
          )
        )
      ) {
        const turno = turnosPorHora[hora][dia] || { idEstadoHorario: 2 }; // Estado "Libre" si no hay turno

        // Asignar estado y color de fondo
        let estadoTexto = "";
        let colorFondo = "";

        switch (turno.idEstadoHorario) {
          case 2:
            estadoTexto = "Libre";
            colorFondo = "gray";
            break;
          case 3:
            estadoTexto = "Reservado";
            colorFondo = "yellow";
            break;
          case 4:
            estadoTexto = "Confirmado";
            colorFondo = "green";
            break;
          default:
            estadoTexto = "Desconocido";
            colorFondo = "white";
            break;
        }

        tdDia.textContent = estadoTexto;
        tdDia.style.backgroundColor = colorFondo;
      } else {
        // Dejar la celda vacía si el día no está en la agenda
        tdDia.textContent = "";
      }

      tr.appendChild(tdDia);
    });

    // Agregar la fila al tbody de la tabla
    datos.appendChild(tr);
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
