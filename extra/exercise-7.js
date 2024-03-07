document.addEventListener("DOMContentLoaded", () => {
  const filmsGallery = document.querySelector(".films-gallery");

  // Fetch data from Studio Ghibli API
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((films) => {
      // Create HTML elements for each film
      films.forEach((film) => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("film");

        // Create image element
        const imageElement = document.createElement("img");
        imageElement.src = film.image;
        imageElement.alt = film.title;

        // Create title element
        const titleElement = document.createElement("h2");
        titleElement.textContent = film.title;

        // Append image and title to film element
        filmElement.appendChild(imageElement);
        filmElement.appendChild(titleElement);

        // Append film element to filmsGallery
        filmsGallery.appendChild(filmElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching films:", error);
    });
});
