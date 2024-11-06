async function iniciarCalendarioTurno() {
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const datos = await obtenerTurnos();

    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: "es",
      initialView: "dayGridWeek",
      height: "100%",
      events: datos,
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
      slotDuration: "01:00",
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
      },
    });
    calendar.render();
  } else {
    console.error("No se encontró el elemento #calendar");
  }
}

async function obtenerTurnos() {
  try {
    const response = await fetch(`/turnos`);

    if (!response.ok) throw new Error("Error al obtener los turnos");

    const turnos = await response.json();
    return turnos.map((turno) => {
      return {
        title: turno.hora,
        start: turno.hora,
        duration: "00:20",
      };
    });
  } catch (error) {
    console.error("Error al obtener los Turnos: ", error);
  }
}
