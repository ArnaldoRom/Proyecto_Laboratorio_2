async function buscarAgendaPro() {
  const nombre = document.getElementById("nombre").value;
  const especialidad = document.getElementById("especialidad").value;
  const dia = document.getElementById("dias-semana").value;

  let url = "/agenda?";
  let direccion = [];

  if (especialidad) direccion.push("especialidad=" + especialidad);

  if (nombre) direccion.push("nombre=" + nombre);

  if (dia) direccion.push("dia=" + dia);

  url += direccion.join("&");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la solicitud");

    const data = await response.json();
    await crearCards(data);
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

async function crearCards(data) {
  const contenedor = document.getElementById("agendas-resultado");

  contenedor.innerHTML = "";

  for (const agenda of data) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.onclick = () => abrirModalAgendas(agenda);

    // const img = document.createElement("img");
    // img.src = agenda.photo_path || "ruta/por_defecto.jpg"; // Asigna una imagen por defecto si no hay foto
    // img.alt = "Imagen del profesional";
    // img.classList.add("img");

    const h4 = document.createElement("h4");
    h4.textContent = `${agenda.nombrePro} ${agenda.apellidoPro}`;

    const h5 = document.createElement("h5");
    h5.textContent = agenda.nombreEsp;

    // div.appendChild(img);
    div.appendChild(h4);
    div.appendChild(h5);
    contenedor.appendChild(div);
  }
}

async function abrirModalAgendas(agenda) {
  const modal = document.createElement("div");
  modal.classList.add("modal-agendasSecretaria");

  const contenidoModal = document.createElement("div");
  contenidoModal.classList.add("contenido-modal-agendaSecretaria");

  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.textContent = "×";
  closeButton.onclick = () => modal.remove();

  const nombrePro = document.createElement("h2");
  nombrePro.textContent = `${agenda.nombrePro} ${agenda.apellidoPro}`;
  nombrePro.classList.add("modal-nombre");

  const especialidadPro = document.createElement("h3");
  especialidadPro.textContent = agenda.nombreEsp;
  especialidadPro.classList.add("modal-especialidad");

  // Contenedor de turnos en una grilla de 3 columnas
  const turnosContainer = document.createElement("div");
  turnosContainer.classList.add("turnos-container");

  const turnos = await turnosPorAgenda(agenda.idAgenda);
  turnos.forEach((turno) => {
    const horaTurno = document.createElement("span");
    horaTurno.classList.add("turno-hora");
    horaTurno.textContent = turno.hora;

    horaTurno.style.backgroundColor =
      turno.idEstadoHorario === 4 ? "green" : "gray";

    turnosContainer.appendChild(horaTurno);
  });

  const botonReservar = document.createElement("button");
  botonReservar.classList.add("reservar-button");
  botonReservar.textContent = "Reservar turno";
  botonReservar.onclick = (event) => {
    event.preventDefault();
    mostrar("turnos", agenda.idAgenda);
    modal.remove();
  };

  contenidoModal.appendChild(closeButton);
  contenidoModal.appendChild(nombrePro);
  contenidoModal.appendChild(especialidadPro);
  contenidoModal.appendChild(turnosContainer);
  contenidoModal.appendChild(botonReservar);
  modal.appendChild(contenidoModal);

  document.body.appendChild(modal); // Agregar el modal al DOM

  // Mostrar el modal
  modal.style.display = "block";
}

async function turnosPorAgenda(idAgenda) {
  try {
    const response = await fetch(`/turno/agenda/${idAgenda}`);

    if (!response.ok) throw new Error("Error obteniendo los turnos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo los turnos:", error);
  }
}

function buscar() {
  const enviar = document.getElementById("enviar-form-agenda");

  enviar.addEventListener("click", (event) => {
    event.preventDefault();
    buscarAgendaPro();
  });
}
