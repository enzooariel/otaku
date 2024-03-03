if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
        });
}
document.addEventListener('DOMContentLoaded', () => {
        function apiCall() {
            fetch("../json/eventos.json")
                .then((respuesta) => respuesta.json())
                .then(data => {
                    const eventos = data.resultados;
                    const eventosContainer = document.querySelector('#container');

                    eventos.forEach(evento => {
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.style.width = '18rem';

                        card.innerHTML = `
                            <img src="${evento.img}" class="card-img-top" alt="Event Image">
                            <div class="card-body">
                                <h5 class="card-title">${evento.nombre}</h5>
                                <p class="card-text">${evento.fecha}</p>
                                <p class="card-text">${evento.ubicacion}</p>
                                <p class="card-text">${evento.descripcion}</p>
                                <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" data-bs-evento-nombre="${evento.nombre}" data-bs-evento-fecha="${evento.fecha}" data-bs-evento-ubicacion="${evento.ubicacion}" data-bs-evento-descripcion="${evento.descripcion}">Más información</a>
                                <!-- Nuevo botón "Me gusta" -->
  
                        `;

                        eventosContainer.appendChild(card);

                        // // Evento para el botón "Me gusta"
                        // const likeBtn = card.querySelector('.btn-like');
                        // likeBtn.addEventListener('click', (event) => {
                        //     event.stopPropagation(); // Evita que el clic se propague al botón "Más información"

                        //     const eventoId = likeBtn.getAttribute('data-evento-id');

                        //     // Enviar un mensaje al Service Worker
                        //     navigator.serviceWorker.controller.postMessage({
                        //         action: 'guardarMeGusta',
                        //         eventoId: eventoId
                        //     });

                        //     // Redirigir a la página de favoritos
                        //     window.location.href = '../html/favoritos.html';
                        // });
                    
                    


                        const masInformacionBtn = card.querySelector('.btn-primary');

                        masInformacionBtn.addEventListener('click', () => {
                            const nombre = masInformacionBtn.getAttribute('data-bs-evento-nombre');
                            const fecha = masInformacionBtn.getAttribute('data-bs-evento-fecha');
                            const ubicacion = masInformacionBtn.getAttribute('data-bs-evento-ubicacion');
                            const descripcion = masInformacionBtn.getAttribute('data-bs-evento-descripcion');

                            // Lógica que quieres ejecutar cuando se hace clic en "Más información"
                            console.log('Botón "Más información" clicado para el evento:', nombre);

                            // Crea el contenido dinámico del modal
                            const modalBody = document.querySelector('#myModal .modal-body');
                            modalBody.innerHTML = `
                                <img src="${evento.img}" class="card-img-top mb-3" alt="Event Image">
                                
                                <h5 class="mt-2">Detalles del evento:</h5>
                                <p><strong>Nombre:</strong> ${nombre}</p>
                                <p><strong>Fecha:</strong> ${fecha}</p>
                                <p><strong>Ubicación:</strong> ${ubicacion}</p>
                                <p><strong>Descripción:</strong> ${descripcion}</p>
                                <!-- Nueva sección con la tabla y el botón de compra -->
                                <div class="mt-3">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>Entradas Disponibles</td>
                                                <td>50</td>
                                            </tr>
                                            <tr>
                                                <td>Horario</td>
                                                <td> ${evento.horario}</td>
                                            </tr>
                                            <tr>
                                                <td>Dirección</td>
                                                <td>${evento.direccion}</td>
                                            </tr>
                                            <tr>
                                                <td>Precio</td>
                                                <td>${evento.precio}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- Botón de Comprar -->
                                    <button class="btn btn-primary">Comprar</button>
                                </div>
                            `;

                            // Muestra el modal
                            const myModal = new bootstrap.Modal(document.getElementById('myModal'));
                            myModal.hide();

                        });
                    });
                })
                .catch(error => {
                    console.error('Hubo un problema con la operación fetch:', error.message);
                });
        }

        apiCall();

});