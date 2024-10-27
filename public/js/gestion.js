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
  const resultado = document.getElementById("tabla");
  console.log("tbody encontrado:", resultado);

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

function abrirModal() {
  const agregarSucursal = document.getElementById(`abrir-modal`);
  const nuevaSucursal = document.getElementById(`enviar-form`);
  const modalSucursal = document.getElementById(`modal`);

  agregarSucursal.addEventListener("click", () => {
    modalSucursal.showModal();
  });

  nuevaSucursal.addEventListener("click", () => {
    modalSucursal.closest();
  });
}
