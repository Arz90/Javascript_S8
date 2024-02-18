// Convierte la siguiente función con un fetch utilizando async-await. Recuerda que para usar .fetch() tendrás que probar el ejercicio en el navegador;


const getCharacters = async () => {
    try{
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const characters = await response.json();
        console.log(characters)
    } catch (error) {
        console.log('Error characters, error');
    }
}

getCharacters();

