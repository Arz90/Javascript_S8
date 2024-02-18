// En base al ejercicio anterior, crea un botón con el texto 'X' para cada uno de los p que hayas insertado y que si el usuario hace click en este botón eliminemos el parrafo asociado.

const baseUrl = "https://api.nationalize.io?name=";

// Función para crear un párrafo y el botón 'X'
function newPwithButton(nombre, mensaje) {
    const newP = document.createElement("p");
    newP.textContent = mensaje;

    const botonX = document.createElement("button");
    botonX.textContent = "X";
    botonX.addEventListener("click", function () {
        // Elimina el párrafo cuando se hace clic en el botón 'X'
        document.body.removeChild(newP);
    });

    newP.appendChild(botonX);

    document.body.appendChild(newP);
}
document.getElementById("busqueda").addEventListener("click", function () {

  const name = document.getElementById("inputClick").value;
  // comprobamos que no haya nombre antes de hacer la consulta
  if (name.trim() !== "") {
    // Combinamos la URL base con el nombre para formar la URL completa
    const apiUrl = baseUrl + name;
    // Usamos fetch para hacer la consulta a la API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.country && data.country.length > 0) {
            const mensaje = data.country.map(pais => `un ${Math.round(pais.probability * 100)} porciento de ser de ${pais.country_id}`).join(' y ');
            // Llamamos a la función para crear el párrafo con el botón 'X'
            newPwithButton(name, `El nombre ${name} tiene ${mensaje}.`);
        } else {
          // Llamamos a la función para crear el párrafo con el botón 'X'
          newPwithButton(name, `No se encontraron resultados para el nombre ${name}.`);
        }
      })
      .catch((error) => {
        console.error("Error en la consulta a la API:", error);
      });
  } else {
    // Llamamos a la función para crear el párrafo con el botón 'X'
    newPwithButton(name, "Por favor, ingresa un nombre antes de consultar.");
  }
});
