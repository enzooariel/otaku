document.addEventListener('DOMContentLoaded', () => {
    const favoritosContainer = document.getElementById('favoritos-container');
    const searchInput = document.getElementById('searchInput');

    // Cargar eventos favoritos desde el archivo JSON
    fetch("../json/eventos.json")
        .then(response => response.json())
        .then(data => {
            const eventosFavoritos = data.resultados;

            
            mostrarFavoritos(eventosFavoritos);

            // Agregar evento de búsqueda
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();

                
                const filteredFavoritos = eventosFavoritos.filter(evento =>
                    evento.nombre.toLowerCase().includes(searchTerm) ||
                    evento.ubicacion.toLowerCase().includes(searchTerm) ||
                    evento.descripcion.toLowerCase().includes(searchTerm)
                );

                // Muestra los eventos favoritos filtrados
                mostrarFavoritos(filteredFavoritos);
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la operación fetch:', error.message);
        });

    function mostrarFavoritos(favoritos) {
        
        favoritosContainer.innerHTML = '';

        
        favoritos.forEach(evento => {
            const card = document.createElement('div');
            card.classList.add('card', 'col-md-3', 'col-10', 'mb-4', 'mx-md-2');
            card.style.width = '28rem';

            card.innerHTML = `
                <img src="${evento.img}" class="card-img-top" alt="Event Image">
                <div class="card-body">
                    <h5 class="card-title">${evento.nombre}</h5>
                    <p class="card-text">${evento.fecha}</p>
                    <p class="card-text">${evento.ubicacion}</p>
                    <p class="card-text">${evento.descripcion}</p>
                    <p class="card-text">Horario: ${evento.horario || 'No especificado'}</p>
                    <p class="card-text">Dirección: ${evento.direccion || 'No especificada'}</p>
                    <p class="card-text">Precio: ${evento.precio || 'No especificado'}</p>
                    <!-- Puedes agregar más detalles según tus necesidades -->
                </div>
            `;

            favoritosContainer.appendChild(card);
        });
    }
});