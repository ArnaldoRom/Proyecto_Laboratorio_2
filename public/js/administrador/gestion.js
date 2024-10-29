async function listaSucursales() {
  try {
    const response = await fetch(`/gestion/sucursal`);

    if (!response.ok) throw new Error("Error al obtener Sucursales");

    const data = await response.json();
    cargarSucursales(data);
  } catch (error) {
    console.error("Error al obtener Sucursales: ", error);
  }
}

function cargarSucursales(sucursales) {
  const resultado = document.querySelector("#tabla-sucursales tbody");

  if (!resultado) {
    console.error("No se encontró el tbody, revisa la estructura HTML.");
    return; // Sal de la función si tbody no está disponible
  }
  resultado.innerHTML = "";

  sucursales.forEach((sucursal) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sucursal.nombre}</td>
      <td>${sucursal.direccion}</td>
      <td>${sucursal.clasificacion}</td>
    `;
    resultado.appendChild(tr);
  });
}

async function registrarSucursal() {
  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const clasificacion = document.getElementById("clasificacion").value;
  const exito = document.getElementById("exito");

  try {
    const response = await fetch("/gestion/sucursal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        direccion,
        clasificacion,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar la Sucursal");
    }

    await listaSucursales();

    document.getElementById("modal").close();
    exito.style.display = "block";
    exito.showModal();

    setTimeout(() => {
      exito.close();
      exito.style.display = "none";
    }, 3000);
  } catch (error) {
    console.error("Error al registrar sucursal: ", error);
  }
}

function abrirModal() {
  const agregarSucursal = document.getElementById(`abrir-modal`);
  const nuevaSucursal = document.getElementById(`enviar-form`);
  const modalSucursal = document.getElementById(`modal`);

  agregarSucursal.addEventListener("click", () => {
    modalSucursal.showModal();
  });

  nuevaSucursal.addEventListener("click", () => {
    event.preventDefault();
    registrarSucursal();
  });
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.close();
  }
};
