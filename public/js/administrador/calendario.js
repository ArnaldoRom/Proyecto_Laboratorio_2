async function iniciarCalendario() {
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const datos = await obtenerFechas();

    const calendar = new FullCalendar.Calendar(calendarEl, {
      locale: "es",
      initialView: "dayGridMonth",
      height: "100%",
      contentHeight: "auto",
      events: datos,
      headerToolbar: {
        start: "prev today",
        center: "title",
        end: "next",
      },
      buttonText: {
        today: "hoy",
        list: "Agenda",
      },
    });
    obtenerFechas();
    calendar.render();
  } else {
    console.error("No se encontró el elemento #calendar");
  }
}

async function obtenerFechas() {
  try {
    const response = await fetch("/gestion/calendario");

    if (!response.ok) throw new Error("Error al obtener fechas");

    const fechas = await response.json();

    return fechas.map((fecha) => {
      return {
        title: fecha.descripcion,
        start: fecha.diasNoLaborables || fecha.fechaInicio,
        end: fecha.fechaFin,
      };
    });
  } catch (error) {
    console.error("error al cargar eventos: ", error);
  }
}

async function agregarFecha() {
  const descripcion = document.getElementById("descripcion").value;
  const noTrabaja = document.getElementById("dias-no-laborables").value;
  const desde = document.getElementById("desde").value;
  const hasta = document.getElementById("hasta").value;
  const exito = document.getElementById("exito-calendario");

  try {
    const response = await fetch("/gestion/calendario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descripcion: descripcion,
        diasNoLaborables: noTrabaja || null,
        fechaInicio: desde || null,
        fechaFin: hasta || null,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al agragar nueva fecha");
    }

    await iniciarCalendario();
    exito.style.display = "block";
    exito.showModal();

    setTimeout(() => {
      exito.close();
      exito.style.display = "none";
    }, 3000);
  } catch (error) {
    console.error("Error al registrar nuevo evento");
  }
}

function enviarDatos() {
  const enviar = document.getElementById("enviar-form");

  enviar.addEventListener("click", (event) => {
    event.preventDefault();
    agregarFecha();
  });
}
