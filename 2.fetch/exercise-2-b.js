//En base al ejercicio anterior. Crea dinamicamente un elemento <p> por cada petición a la api que diga...'El nombre X tiene un Y porciento de ser de Z' etc etc.

//EJ: El nombre Abel tiene un 22 porciento de ser de ET y un 6 porciento de ser de MZ.

const baseUrl = "https://api.nationalize.io?name=";

// evento click al botón
document.getElementById("busqueda").addEventListener("click", function () {
  // valor del input
  const name = document.getElementById("inputClick").value;
  // comprobamos que no haya nombre antes de hacer la consulta
  if (name.trim() !== "") {
    // Combinamos la URL base con el nombre para formar la URL completa
    const apiUrl = baseUrl + name;
    // Usamos fetch para hacer la consulta a la API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        
        const newP = document.createElement("p");

        if (data.country && data.country.length > 0) {
            const mensaje = data.country.map(pais => `un ${Math.round(pais.probability * 100)} porciento de ser de ${pais.country_id}`).join(' y ');
            newP.textContent = `El nombre ${name} tiene ${mensaje}.`;
        } else {
          newP.textContent = `No se encontraron resultados para el nombre ${name}.`;
        }

        // Agrega el nuevo párrafo al cuerpo del documento
        document.body.appendChild(newP);
      })
      .catch((error) => {
        console.error("Error en la consulta a la API:", error);
      });
  } else {
    const newP = document.createElement("p");
    newP.textContent = "Por favor, ingresa un nombre antes de consultar.";
    document.body.appendChild(newP);
  }
});