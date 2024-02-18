// En base a la api de Breaking Bad (https://breakingbadapi.com/), vamos a desarrollar una página dinámicamente en la que visualizar una galería con las imagenes y los nombres de los personajes de la serie. Para ellos es necesario usar el endpoint 'https://breakingbadapi.com/api/characters'.

//Si te fijas en la respuesta de la api, la imagen está en la propiedad 'img' y el título en la propiedad 'name'.

const fetchCharacters = async () => {
    try {
        const response = await fetch('https://breakingbadapi.com/api/characters');
        const characters = await response.json();
        displayCharacters(characters);
    } catch (error) {
        console.log('Error characters:', error);
    }
};

function displayCharacters(characters) {
    const charactersContainer = document.body;

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const characterName = document.createElement('h2');
        characterName.textContent = character.name;

        const characterImage = document.createElement('img');
        characterImage.src = character.img;
        characterImage.alt = character.name;

        characterCard.appendChild(characterName);
        characterCard.appendChild(characterImage);

        charactersContainer.appendChild(characterCard);
    });
};

// Llama a la función para cargar y mostrar los personajes
fetchCharacters();

// La api esta muerta