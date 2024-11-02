let cargando = false;

function mostrar(vista, especialidad = "", idAgenda = "", push = true) {
  if (cargando) return;
  cargando = true;

  const contenedor = document.querySelector(".content");
  let url = "";
  let newurl = "";

  switch (vista) {
    case "agenda":
      url = `/vista`;
      newurl = `/agendaProfecional/${especialidad}/${idAgenda}`;
      break;
    default:
      console.error("No existe vista");
      cargando = false;
      return;
  }

  const datos = { vista, especialidad, idAgenda };
  if (push && location.pathname !== newurl) {
    history.pushState(datos, "", newurl);
  }

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      contenedor.innerHTML = html;
      if (vista === "agenda") {
        iniciarDataTableAgendaPro();
        recuperarTurnosConfirmados(idAgenda);
      }
    })
    .catch((error) => console.error("error", error))
    .finally(() => {
      cargando = false;
    });
}

window.addEventListener("popstate", (event) => {
  const path = location.pathname.split("/");
  const especialidad = path[2];
  const idAgenda = path[3];

  if (especialidad && idAgenda) {
    mostrar("agenda", especialidad, idAgenda, false);
  } else {
    console.warn("Ruta no reconocida:", location.pathname);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  recuperarAgendas();
});
