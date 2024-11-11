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

      const diasAgenda = datos.dia.split(",").map((dia) => parseInt(dia));

      console.log(diasAgenda);
      await obtenerTurnos(idAgenda, diasAgenda);
    } else {
      console.error("No se encontro la agenda");
    }
  } catch (error) {
    console.error("Error al obtener los datos de la agenda: ", error);
  }
}

async function obtenerTurnos(idAgenda, diasAgenda) {
  try {
    const response = await fetch(`/turno/agenda/${idAgenda}`);

    if (!response.ok) throw new Error("Error al obtener los turnos");

    const turnos = await response.json();

    // Convertir los días de la agenda a un arreglo de números
    const diasAgendaArray = diasAgenda
      .split(",")
      .map((dia) => parseInt(dia.trim()));

    // Filtrar los turnos solo para los días que están en diasAgendaArray
    const turnosFiltrados = turnos.filter((turno) => {
      // Aquí ya no usamos fecha.dia, sino que si el turno tiene alguna propiedad que nos indique
      // qué día de la semana es, la usamos. Por ejemplo:
      // Si cada turno tiene una propiedad `diaTurno`, como un número del 0 al 6 (domingo a sábado),
      // podemos hacer la comparación con diasAgendaArray.
      const diaTurno = turno.diaTurno; // Esto asume que el turno tiene un campo 'diaTurno' con el día
      return diasAgendaArray.includes(diaTurno);
    });

    cargarTablaTurnos(turnosFiltrados);
  } catch (error) {
    console.error("Error al obtener los turnos: ", error);
  }
}

async function cargarTablaTurnos(turnos) {
  const datos = document.querySelector("#tabla-turno tbody");

  if (!datos) {
    console.error("No se encontró el tbody, revisa la estructura HTML.");
    return;
  }

  datos.innerHTML = "";

  turnos.forEach((turno) => {
    const tr = document.createElement("tr");

    // Crear las celdas (td) y asignarles el contenido y el estilo según el estado
    const tdHora = document.createElement("td");
    tdHora.textContent = turno.hora;

    const tdEstado = document.createElement("td");
    const tdEstado2 = document.createElement("td");
    const tdEstado3 = document.createElement("td");
    const tdEstado4 = document.createElement("td");
    const tdEstado5 = document.createElement("td");

    let estadoTexto = "";
    let colorFondo = "";

    // Asignar texto y color de fondo según el idEstadoHorario
    switch (turno.idEstadoHorario) {
      case 2:
        estadoTexto = "Libre";
        colorFondo = "gray"; // Gris para libre
        break;
      case 3:
        estadoTexto = "Reservado";
        colorFondo = "yellow"; // Amarillo para reservado
        break;
      case 4:
        estadoTexto = "Confirmado";
        colorFondo = "green"; // Verde para confirmado
        break;
      default:
        estadoTexto = "Desconocido";
        colorFondo = "white"; // Blanco para estados no definidos
        break;
    }

    // Asignar el texto y el color de fondo a las celdas
    tdEstado.textContent = estadoTexto;
    tdEstado.style.backgroundColor = colorFondo;

    tdEstado2.textContent = estadoTexto;
    tdEstado2.style.backgroundColor = colorFondo;

    tdEstado3.textContent = estadoTexto;
    tdEstado3.style.backgroundColor = colorFondo;

    tdEstado4.textContent = estadoTexto;
    tdEstado4.style.backgroundColor = colorFondo;

    tdEstado5.textContent = estadoTexto;
    tdEstado5.style.backgroundColor = colorFondo;

    // Añadir las celdas a la fila
    tr.appendChild(tdHora);
    tr.appendChild(tdEstado);
    tr.appendChild(tdEstado2);
    tr.appendChild(tdEstado3);
    tr.appendChild(tdEstado4);
    tr.appendChild(tdEstado5);

    // Añadir la fila al cuerpo de la tabla
    datos.appendChild(tr);
  });
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
