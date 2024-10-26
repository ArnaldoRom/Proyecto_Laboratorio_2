function mostrar(vista) {
  const contenedor = document.querySelector(".content");
  let url = "";

  switch (vista) {
    case "cargarSucursal":
      url = "/cargarSucursal";
      break;
    case "crearProfesional":
      url = "/crearProfesional";
      break;
    default:
      console.error("No existe vista");
      return;
  }

  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      contenedor.innerHTML = html;
    })
    .catch((error) => console.error("error", error));
}
