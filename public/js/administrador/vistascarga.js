function mostrar(vista, push = true) {
  const contenedor = document.querySelector(".content");
  let url = "";
  let newurl = "";

  switch (vista) {
    case "cargarAgenda":
      url = "/cargarAgenda";
      newurl = "/agenda";
      break;
    case "crearProfesional":
      url = "/crearProfesional";
      newurl = "/profesional";
      break;
    case "cargarEmpleado":
      url = "/cargarEmpleado";
      newurl = "/empleado";
      break;
    case "cargarSucursal":
      url = "/cargarSucursal";
      newurl = "/sucursal";
      break;
    case "cargarCalendario":
      url = "/cargarCalendario";
      newurl = "/calendario";
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
      if (vista === "cargarSucursal") {
        iniciarDataTableSucursal();
        abrirModal();
      } else if (vista === "crearProfesional") {
        iniciarDataTableProfesional();
        abrirModalProfesional();
        cargarEspecialidades();
        abrirModalEspecialidad();
        cargarProfesionalesSelect();
      } else if (vista === "cargarEmpleado") {
        iniciarDataTableEmpleado();
        abrirModalEmpleado();
        cargarSucursalesEmpleados();
      }
    })
    .catch((error) => console.error("error", error));
}

window.addEventListener("popstate", (event) => {
  const path = location.pathname;

  if (path === "/agenda") {
    mostrar("cargarAgenda", false);
  } else if (path === "/profesional") {
    mostrar("crearProfesional", false);
  } else if (path === "/empleado") {
    mostrar("cargarEmpleado", false);
  } else if (path === "/sucursal") {
    mostrar("cargarSucursal", false);
  } else if (path === "/calendario") {
    mostrar("cargarCalendario", false);
  } else {
    console.warn("Ruta no reconocida:", path);
  }
});
