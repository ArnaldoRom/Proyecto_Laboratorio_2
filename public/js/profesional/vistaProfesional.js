function mostrar(vista, especialidad = "", idAgenda = "", push = true) {
  const contenedor = document.querySelector(".content");
  let url = "";
  let newurl = "";

  console.log(especialidad);
  console.log(idAgenda);

  switch (vista) {
    case "agenda":
      url = `/vista`;
      newurl = `/agendaProfecional/${especialidad}/${idAgenda}`;
      break;
    default:
      console.error("No existe vista");
      return;
  }

  if (push && location.pathname !== newurl) {
    history.pushState({}, "", newurl);
  }

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      contenedor.innerHTML = html;
      if (vista === "agenda") {
        recuperarTurnosConfirmados(idAgenda);
      }
    })
    .catch((error) => console.error("error", error));
}

window.addEventListener("popstate", (event) => {
  const path = location.pathname;
  const especialidad = path.split("/")[2];
  const idAgenda = path.split("/")[3];

  if (especialidad) {
    mostrar("agenda", especialidad, idAgenda, false);
  } else {
    console.warn("Ruta no reconocida:", path);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  recuperarAgendas();
});
