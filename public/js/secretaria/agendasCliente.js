async function buscarAgendaPro() {
  const nombre = document.getElementById("nombre").value;
  const especialidad = document.getElementById("especialidad").value;
  const dia = document.getElementById("dias-semana").value;

  let url = "/agenda?";
  let direccion = [];

  try {
    // const response = await fetch(`/agenda/especialidad/${especialidad}`);
    // const response = await fetch(`/agenda/profecional/${nombre}`);
    const response = await fetch(`/agenda/dias/${dia}`);
    const data = await response.json();

    crearCards(data);
  } catch (error) {}
}

function crearCards(data) {
  const contenedor = document.getElementById("agendas-resultado");

  contenedor.innerHTML = "";
  data.forEach((agenda) => {
    const div = document.createElement("div");
    div.classList.add("card");

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
  });
}

function buscar() {
  const enviar = document.getElementById("enviar-form-agenda");

  enviar.addEventListener("click", (event) => {
    event.preventDefault();
    buscarAgendaPro();
  });
}
