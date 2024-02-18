document.addEventListener('DOMContentLoaded', () => {
    const planetsContainer = document.querySelector('[data-function="planets"]');
    const searchContainer = document.querySelector('[data-function="search"]');
    const charactersContainer = document.querySelector('[data-function="characters"]');

    // Almacena todos los personajes disponibles
    let allCharacters = [];
    // Almacena el último personaje seleccionado
    let lastSelectedCharacter = null;

    // Función para cargar planetas
    const loadPlanets = async () => {
        const response = await fetch('http://localhost:3000/planets');
        const planetsData = await response.json();

        planetsData.forEach(planet => {
            const planetElement = document.createElement('div');
            planetElement.innerHTML = `<img src="${planet.image}" alt="${planet.name}"><p>${planet.name}</p>`;
            planetElement.addEventListener('click', () => loadCharacters(planet.id));
            planetsContainer.appendChild(planetElement);
        });
    };

    // Función para cargar personajes según el planeta seleccionado
    const loadCharacters = async (idPlanet) => {
        charactersContainer.innerHTML = ''; // Limpiamos el contenedor de personajes

        const response = await fetch(`http://localhost:3000/characters?idPlanet=${idPlanet}`);
        const charactersData = await response.json();

        allCharacters = charactersData; // Almacenamos todos los personajes disponibles

        charactersData.forEach(character => {
            const characterElement = document.createElement('div');
            characterElement.innerHTML = `<img src="${character.avatar}" alt="${character.name}"><p>${character.name}</p>`;
            characterElement.addEventListener('click', () => toggleDescription(character, characterElement));
            charactersContainer.appendChild(characterElement);
        });

        // Agregar input de búsqueda
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar por nombre';
        searchInput.addEventListener('input', () => filterCharacters(searchInput.value));
        searchContainer.innerHTML = '';
        searchContainer.appendChild(searchInput);
    };

    // Función para filtrar personajes por nombre
    const filterCharacters = (searchTerm) => {
        const filteredCharacters = allCharacters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        charactersContainer.innerHTML = ''; // Limpiamos el contenedor de personajes filtrados

        filteredCharacters.forEach(character => {
            const characterElement = document.createElement('div');
            characterElement.innerHTML = `<img src="${character.avatar}" alt="${character.name}"><p>${character.name}</p>`;
            characterElement.addEventListener('click', () => toggleDescription(character, characterElement));
            charactersContainer.appendChild(characterElement);
        });
    };

    // Función para mostrar/ocultar la descripción del personaje
    const toggleDescription = (character, characterElement) => {
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = character.description;

        if (lastSelectedCharacter && lastSelectedCharacter === characterElement) {
            // Si se hace clic en el mismo personaje, ocultar la descripción
            lastSelectedCharacter = null;
            descriptionElement.remove();
        } else {
            // Si se hace clic en un nuevo personaje, mostrar la descripción
            const existingDescription = charactersContainer.querySelector('p');
            if (existingDescription) {
                existingDescription.remove(); // Eliminamos la descripción existente
            }

            lastSelectedCharacter = characterElement;
            charactersContainer.appendChild(descriptionElement);
        }
    };

    // Cargar planetas al cargar la página
    loadPlanets();
});
