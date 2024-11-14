function mostrar(vista, idAgenda = "", push = true) {
  const contenedor = document.querySelector(".content");
  let url = "";
  let newurl = "";

  switch (vista) {
    case "agendas":
      url = "/listaAgendas";
      newurl = "/listaAgendas";
      break;
    case "turnos":
      url = "/cargaturnos";
      newurl = "/reservaTurnos";
      break;
    case "paciente":
      url = "/gestionPacientes";
      newurl = "/pacientesGestion";
      break;
    default:
      console.error("No existe vista");
      return;
  }

  if (push) {
    history.pushState({}, "", newurl);
  }

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      contenedor.innerHTML = html;
      if (vista === "agendas") {
        buscar();
      } else if (vista === "turnos") {
        iniciarDataTableTurnoSecretaria();
        turnoAgenda(idAgenda);
      } else if (vista === "paciente") {
      }
    })
    .catch((error) => console.error("error", error));
}

window.addEventListener("popstate", (event) => {
  const path = location.pathname;

  if (path === "/listaAgendas") {
    mostrar("agendas", false);
  } else if (path === "/reservaTurnos") {
    mostrar("turnos", false);
  } else if (path === "/pacientesGestion") {
    mostrar("paciente", false);
  } else {
    console.warn("Ruta no reconocida:", path);
  }
});
