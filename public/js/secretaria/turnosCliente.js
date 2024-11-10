async function iniciarCalendarioTurno() {
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: "es",
      initialView: "dayGridDay",
      height: "auto",
      headerToolbar: {
        start: "prev today dayGridDay dayGridWeek",
        center: "title",
        end: "next",
      },
      buttonText: {
        today: "hoy",
        list: "Agenda",
        dayGridDay: "Dia",
        dayGridWeek: "Semana",
      },
      views: {
        dayGridWeek: {
          type: "dayGrid",
          duration: { weeks: 1 },
        },
        dayGridDay: {
          type: "dayGrid",
          duration: { days: 1 },
        },
      },
      events: [],
      eventContent: function (arg) {
        const hora = arg.event.start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const paciente = arg.event.title || "No asignado"; // Muestra el nombre o "No asignado"
        const estado = arg.event.extendedProps.estado;

        // Define el color del botón basado en el estado
        let estadoClass = "";
        let estadoTexto = "";

        if (estado === "confirmado") {
          estadoClass = "btn-confirmado";
          estadoTexto = "Confirmado";
        } else if (estado === "reservado") {
          estadoClass = "btn-reservado";
          estadoTexto = "Reservado";
        } else {
          estadoClass = "btn-no-confirmado";
          estadoTexto = "No confirmado";
        }

        return {
          html: `
            <div class="turno">
              <div class="turno-hora">${hora}</div>
              <div class="turno-paciente">${paciente}</div>
              <button class="turno-estado ${estadoClass}">${estadoTexto}</button>
            </div>
          `,
        };
      },
      slotDuration: "01:00",
      windowResize: function () {
        calendar.updateSize();
      },
    });
    calendar.render();

    window.miCalendarioTurno = calendar;
  } else {
    console.error("No se encontró el elemento #calendar");
  }
}

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
    } else {
      console.error("No se encontro la agenda");
    }
  } catch (error) {
    console.error("Error al obtener los datos de la agenda: ", error);
  }
}

async function obtenerTurnos(idAgenda) {
  // const nombre = parseInt(document.getElementById("nombre").value, 10);
  // const especialidad = document.getElementById("especialidad").value;

  try {
    const response = await fetch(`/turno/agenda/${idAgenda}`);

    if (!response.ok) throw new Error("Error al obtener los turnos");

    const turnos = await response.json();

    const eventos = turnos.map((turno) => {
      const fecha = new Date();
      const [hora, minuto] = turno.hora.split(":");
      fecha.setHours(hora, minuto, 0, 0);

      const estado =
        turno.idEstadoHorario === 4
          ? "confirmado"
          : turno.idEstadoHorario === 3
          ? "reservado"
          : "no confirmado";

      return {
        title: `${turno.apellido} ${turno.nombre}` || "", // Nombre del paciente
        start: fecha.toISOString(),
        estado: estado, // Estado del turno
      };
    });

    window.miCalendarioTurno.addEventSource(eventos);
  } catch (error) {
    console.error("Error al obtener los Turnos: ", error);
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
