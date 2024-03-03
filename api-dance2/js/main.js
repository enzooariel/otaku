
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
        });
}



document.addEventListener('DOMContentLoaded', () => {


  // Solicitar permisos para las notificaciones
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
        console.log('Permisos de notificación concedidos');
    }
});

        function apiCall() {
            fetch("./json/eventos1.json")
                .then((respuesta) => respuesta.json())
                .then(data => {
                    const eventos = data.resultados.slice(0,3);
                    const eventosContainer = document.querySelector('#landing');

                    const row = document.createElement('div');
                    row.classList.add('row','justify-content-center');
    
                    const header = document.createElement('h2');
                    header.classList.add('text-center', 'mb-4');
                    header.textContent = 'Eventos más cercanos';
    
                    
                    eventosContainer.appendChild(header);

                    eventos.forEach(evento => {
                        const card = document.createElement('div');
                        card.classList.add('card', 'col-md-3', 'col-10', 'mb-4','mx-md-2');
                        card.style.width = '28rem';


                        card.innerHTML = `
                            <img src="${evento.img}" class="card-img-top" alt="Event Image">
                            <div class="card-body">
                                <h5 class="card-title">${evento.nombre}</h5>
                                <p class="card-text">${evento.fecha}</p>
                                <p class="card-text">${evento.ubicacion}</p>
                                <p class="card-text">${evento.descripcion}</p>
                                <a href="./html/eventos.html" class="btn btn-primary">Ir a eventos</a>
                                
                              
                        `;
    
                        // Agregar la tarjeta a la fila
                        row.appendChild(card);

                      

                    
                    


                        // const masInformacionBtn = card.querySelector('.btn-primary');

                        // masInformacionBtn.addEventListener('click', () => {
                        //     const nombre = masInformacionBtn.getAttribute('data-bs-evento-nombre');
                        //     const fecha = masInformacionBtn.getAttribute('data-bs-evento-fecha');
                        //     const ubicacion = masInformacionBtn.getAttribute('data-bs-evento-ubicacion');
                        //     const descripcion = masInformacionBtn.getAttribute('data-bs-evento-descripcion');

                        //     // Lógica que quieres ejecutar cuando se hace clic en "Más información"
                        //     console.log('Botón "Más información" clicado para el evento:', nombre);

                        //     // Crea el contenido dinámico del modal
                        //     const modalBody = document.querySelector('#myModal');
                        //     modalBody.innerHTML = `
                        //         <img src="${evento.img}" class="card-img-top mb-3" alt="Event Image">
                                
                        //         <h5 class="mt-2">Detalles del evento:</h5>
                        //         <p><strong>Nombre:</strong> ${nombre}</p>
                        //         <p><strong>Fecha:</strong> ${fecha}</p>
                        //         <p><strong>Ubicación:</strong> ${ubicacion}</p>
                        //         <p><strong>Descripción:</strong> ${descripcion}</p>
                        //         <!-- Nueva sección con la tabla y el botón de compra -->
                        //         <div class="mt-3">
                        //             <table class="table">
                        //                 <tbody>
                        //                     <tr>
                        //                         <td>Entradas Disponibles</td>
                        //                         <td>50</td>
                        //                     </tr>
                        //                     <tr>
                        //                         <td>Horario</td>
                        //                         <td> ${evento.horario}</td>
                        //                     </tr>
                        //                     <tr>
                        //                         <td>Dirección</td>
                        //                         <td>${evento.direccion}</td>
                        //                     </tr>
                        //                     <tr>
                        //                         <td>Precio</td>
                        //                         <td>${evento.precio}</td>
                        //                     </tr>
                        //                 </tbody>
                        //             </table>
                        //             <!-- Botón de Comprar -->
                        //             <button class="btn btn-primary">Comprar</button>
                        //         </div>
                        //     `;

                        //     // Muestra el modal
                        //     const myModal = new bootstrap.Modal(document.getElementById('myModal'));
                        //     myModal.toggle();

                        // });
                    });

                    eventosContainer.appendChild(row);

                })
                .catch(error => {
                    console.error('Hubo un problema con la operación fetch:', error.message);
                });
        }

        let eventInstall;
        let btnInstall = document.querySelector(".btnInstall");
    
        let InstallApp = () => {
            if(eventInstall){
                eventInstall.prompt();
                eventInstall.userChoice
                .then(res => {
                    if(res.outcome === "accepted"){
                        console.log("El usuario aceptó instalar la aplicación");
                        btnInstall.style.display = "none";
                    } else {
                         console.log("No quiere instalar?");
                    }
                })
            }
        }
    
        window.addEventListener("beforeinstallprompt", (e) => {
            console.log("before");
            e.preventDefault();
            eventInstall = e;
            showInstallButton();
        })
    
        let showInstallButton = () => {
            if(btnInstall != undefined){
                btnInstall.style.display = "inline-block";
                btnInstall.addEventListener("click", InstallApp);
            }
        }
        

        apiCall();




});

