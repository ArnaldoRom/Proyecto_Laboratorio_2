function inicializarTurnosPaciente() {
  const contenedor = document.querySelector(".content");
  const url = "/cargaturnos";

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      contenedor.innerHTML = html;
      iniciarDataTableTurnoPaciente();
      // turnoPaciente();
      buscarAgenda();
    })
    .catch((error) =>
      console.error("Error al cargar la vista de reserva de turnos:", error)
    );
}

document.addEventListener("DOMContentLoaded", inicializarTurnosPaciente);
