//Dado el siguiente javascript y html. Añade la funcionalidad necesaria usando fetch() para hacer una consulta a la api cuando se haga click en el botón, pasando como parametro de la api, el valor del input.

const baseUrl = 'https://api.nationalize.io?name=';

        // evento click al botón
        document.getElementById('busqueda').addEventListener('click', function() {

            // valor del input
            const name = document.getElementById('inputClick').value;
            // comprobamos que no haya nombre antes de hacer la consulta
            if (name.trim() !== '') {
                // Combinamos la URL base con el nombre para formar la URL completa
                const apiUrl = baseUrl + name;
                // Usamos fetch para hacer la consulta a la API
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error en la consulta a la API:', error);
                    });
            } else {
                console.log('Por favor, ingresa un nombre antes de consultar.');
            }
        });