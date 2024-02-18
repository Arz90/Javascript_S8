document.addEventListener('DOMContentLoaded', function() {
    const callCatButton = document.getElementById('callCatButton');
    const catGallery = document.getElementById('catGallery');

    callCatButton.addEventListener('click', function() {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                const imageUrl = data[0].url;

                // Crear elementos HTML dinámicamente
                const newCatImage = document.createElement('img');
                newCatImage.src = imageUrl;
                newCatImage.alt = 'Cat';

                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', function() {
                    catGallery.removeChild(newCatImage);
                    catGallery.removeChild(deleteButton);
                });

                // Agregar los elementos al DOM
                catGallery.appendChild(newCatImage);
                catGallery.appendChild(deleteButton);
            })
            .catch(error => console.error('Error fetching cat:', error));
    });
});
