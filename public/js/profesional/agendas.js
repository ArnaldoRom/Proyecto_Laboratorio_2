let dataTableAgendaPro;
let dataTableAgendaProInicializado = false;

const agendaProOpciones = {
  destroy: true,
  pageLength: 10,
  language: {
    url: "/js/dataTable/es_AR.json",
  },
};
const iniciarDataTableAgendaPro = async () => {
  if (dataTableAgendaProInicializado) {
    dataTableAgendaPro.destroy();
  }
  const tablaTurnos = document.querySelector("#tabla-agendas tbody");
  if (tablaTurnos.childElementCount > 0) {
    dataTableAgendaPro = $("#tabla-agenda-profecional").DataTable(
      agendaProOpciones
    );
    dataTableAgendaProInicializado = true;
  }
};

async function recuperarAgendas() {
  const nombre = document.querySelector(".header p").textContent.trim();
  const especialidades = document.getElementById("especialidades");

  try {
    const response = await fetch(`/agenda/profecional/${nombre}`);

    if (!response.ok)
      throw new Error("Error al obtener Agendas del Profecional");

    const data = await response.json();
    especialidades.innerHTML = "";

    data.forEach((agenda) => {
      const li = document.createElement("li");
      const opcion = document.createElement("a");

      opcion.href = "#";
      opcion.textContent = agenda.nombre;
      opcion.addEventListener("click", () => {
        mostrar("agenda", agenda.nombre, agenda.idAgenda);
      });

      li.appendChild(opcion);
      especialidades.appendChild(li);
    });
  } catch (error) {
    console.error("Error al obtener agendas", error);
  }
}

async function recuperarTurnosConfirmados(idAgenda) {
  const tablaTurnos = document.querySelector("#tabla-agendas tbody");

  if (!tablaTurnos) {
    console.error(
      "El elemento con id 'agendas' y su tbody no existen en el DOM."
    );
    return;
  }

  try {
    const response = await fetch(`/turnosConfirmados/${idAgenda}`);
    if (!response.ok) throw new Error("Error al obtener turnos");

    const turnos = await response.json();
    tablaTurnos.innerHTML = ""; // Limpia la tabla

    turnos.forEach((turno) => {
      const tr = document.createElement("tr");

      const tdPaciente = document.createElement("td");
      tdPaciente.textContent = `${turno.apellido} ${turno.nombre}`;

      const tdMotivoConsulta = document.createElement("td");
      tdMotivoConsulta.textContent = turno.motivoConsulta;

      const tdObraSocial = document.createElement("td");
      tdObraSocial.textContent = turno.obraSocial;

      const tdFecha = document.createElement("td");
      tdFecha.textContent = new Date(turno.fecha).toLocaleDateString("en-GB");

      const tdHora = document.createElement("td");
      tdHora.textContent = turno.hora;

      tr.appendChild(tdPaciente);
      tr.appendChild(tdMotivoConsulta);
      tr.appendChild(tdObraSocial);
      tr.appendChild(tdFecha);
      tr.appendChild(tdHora);

      tablaTurnos.appendChild(tr);
    });

    await iniciarDataTableAgendaPro();
  } catch (error) {
    console.error("Error al obtener turnos", error);
  }
}
