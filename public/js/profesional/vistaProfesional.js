function mostrar(vista, especialidad = "", push = true) {
  const contenedor = document.querySelector(".content");
  let url = "";
  let newurl = "";

  switch (vista) {
    case "agenda":
      url = `/vista/${especialidad}`;
      newurl = `/agendaProfecional/${especialidad}`;
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
      if (vista === "agenda") {
        recuperarTurnosReservados(especialidad);
      }
    })
    .catch((error) => console.error("error", error));
}

window.addEventListener("popstate", (event) => {
  const path = location.pathname;

  if (path) {
    mostrar("agenda", path, false);
  } else {
    console.warn("Ruta no reconocida:", path);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  recuperarAgendas();
});
