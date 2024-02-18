document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.querySelector(".b-gallery");
    const loadMoreButton = document.createElement("button");
    loadMoreButton.innerText = "Cargar más";
    loadMoreButton.classList.add("b-btn");
    loadMoreButton.addEventListener("click", loadMoreCharacters);

    let currentPage = 1;

    function loadCharacters(page) {
        const apiUrl = `http://localhost:3000/characters?_page=${page}&_limit=5`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(character => {
                    const characterItem = document.createElement("div");
                    characterItem.classList.add("b-gallery__item");

                    const characterImage = document.createElement("img");
                    characterImage.src = character.image;
                    characterImage.alt = character.name;
                    characterImage.classList.add("b-gallery__img");

                    const characterText = document.createElement("p");
                    characterText.innerText = character.name;
                    characterText.classList.add("b-gallery__text");

                    characterItem.appendChild(characterImage);
                    characterItem.appendChild(characterText);
                    galleryContainer.appendChild(characterItem);
                });

                if (data.length < 5) {
                    // Si la respuesta contiene menos de 5 personajes, oculta el botón
                    loadMoreButton.style.display = "none";
                }
            })
            .catch(error => console.error("Error fetching characters:", error));
    }

    function loadMoreCharacters() {
        currentPage++;
        loadCharacters(currentPage);
    }

    loadCharacters(currentPage);
    document.body.appendChild(loadMoreButton);
});
