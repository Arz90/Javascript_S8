


// Hacer una solicitud fetch a la URL
fetch('http://localhost:3000/diary')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const notasOrdenadas = data.sort((a, b) => new Date(a.date) - new Date(b.date));

        notasOrdenadas.forEach(nota => {
            const notaDiv = document.createElement('div');

            const tituloH3 = document.createElement('h3');
            tituloH3.textContent = nota.title;

            const fechaH5 = document.createElement('h5');
            fechaH5.textContent = nota.date;

            const descripcionP = document.createElement('p');
            descripcionP.textContent = nota.description;

            notaDiv.appendChild(tituloH3);
            notaDiv.appendChild(fechaH5);
            notaDiv.appendChild(descripcionP);

            document.body.appendChild(notaDiv);

            if (tituloH3.textContent === "Querría borrar esto") {
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                // Utilizar una función anónima para pasar el ID de la nota al hacer clic en el botón
                botonEliminar.addEventListener('click', () => eliminarNota(nota.id));

                notaDiv.appendChild(botonEliminar);
            }
        });
    })
    .catch(error => {
        console.error('Error en la solicitud fetch:', error);
    });

    async function eliminarNota(id) {
        try {
            const response = await fetch(`http://localhost:3000/diary/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
    
            const data = await response.json();
        } catch (error) {
            console.error('Error al eliminar la nota:', error);
        }
    }
    