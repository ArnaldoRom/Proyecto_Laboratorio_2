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

      opcion.addEventListener("click", () => mostrar("agenda", agenda.nombre));

      li.appendChild(opcion);
      especialidades.appendChild(li);
    });
  } catch (error) {
    console.error("Error al obtener agendas", error);
  }
}

async function recuperarTurnosReservados(especialidad) {
  const tablaTurnos = document.getElementById("tablaTurnos");

  try {
    const response = await fetch(`/turnos/profecional/${especialidad}`);
    if (!response.ok) throw new Error("Error al obtener turnos");

    const turnos = await response.json();
    tablaTurnos.innerHTML = ""; // Limpia la tabla

    turnos.forEach((turno) => {
      const tr = document.createElement("tr");

      const tdPaciente = document.createElement("td");
      tdPaciente.textContent = turno.paciente;

      const tdFecha = document.createElement("td");
      tdFecha.textContent = turno.fecha;

      const tdHora = document.createElement("td");
      tdHora.textContent = turno.hora;

      const tdEstado = document.createElement("td");
      tdEstado.textContent = turno.estado;

      tr.appendChild(tdPaciente);
      tr.appendChild(tdFecha);
      tr.appendChild(tdHora);
      tr.appendChild(tdEstado);

      tablaTurnos.appendChild(tr);
    });
  } catch (error) {
    console.error("Error al obtener turnos", error);
  }
}
