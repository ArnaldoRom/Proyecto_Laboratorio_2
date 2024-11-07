async function buscarAgendaPro() {
  const nombre = document.getElementById("nombre").value;
  const especialidad = document.getElementById("especialidad").value;
  const dia = document.getElementById("dias-semana").value;

  try {
    const response = await fetch(`/agenda/especialidad/${especialidad}`);
    const data = response.json();

    crearCards(data);
  } catch (error) {}
}

function crearCards(data) {
  const contendor = document.getElementById("agendas-resultado");
  try {
    if (!data) return;

    const div = document.createElement("div");
    div.classList.add("card");

    const img = document.createElement("img");
    img.src = // direccion de la imagen
      img.alt = "imagen de Usuario";
    img.classList.add("img");

    const h4 = document.createElement("h4");
    h4.textContent = data.nombre;

    const h5 = document.createElement("h5");
    h5.textContent = data.especialidad;

    div.appendChild(img);
    div.appendChild(h4);
    div.appendChild(h5);

    contendor.appendChild(div);
  } catch (error) {
    console.error("Error al crear las cards: ", error);
  }
}

function buscar() {
  const enviar = document.getElementById("enviar-form-agenda");

  enviar.addEventListener("click", (event) => {
    event.preventDefault();
    buscarAgendaPro();
  });
}
