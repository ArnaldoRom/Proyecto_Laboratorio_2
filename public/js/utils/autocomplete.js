async function autocomplete(
  input,
  divSugerencia,
  url,
  filtro,
  textSugerencia,
  seleccion = null
) {
  input.onkeyup = async (event) => {
    const inputValue = event.target.value.trim();
    divSugerencia.innerHTML = "";

    if (inputValue) {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }

        const listaDatos = await response.json();

        const datosFiltrados = listaDatos.filter((data) =>
          filtro(data, inputValue)
        );

        if (datosFiltrados.length > 0) {
          datosFiltrados.forEach((datos) => {
            const sugerencia = document.createElement("div");
            sugerencia.classList.add("sugerencia");
            sugerencia.textContent = textSugerencia(datos);

            sugerencia.onclick = () => {
              input.value = textSugerencia(datos);
              divSugerencia.innerHTML = "";

              if (seleccion) {
                seleccion(datos);
              }
            };

            divSugerencia.appendChild(sugerencia);
          });
        } else {
          divSugerencia.innerHTML =
            "<div class= 'sugerencia'>Sin resultados</div>";
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };
}
