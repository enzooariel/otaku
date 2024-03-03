// sw.js


const cacheName = 'Urban-Pass';
const assets =[
    "/",
    "index.html",
    "style.css",
    "js/main.js",
    "html/eventos.html",
    "js/eventos.js",
    "img/banner.png",
    "json/eventos.json",
    "json/eventos1.json",
    "html/contacto.html",
    "html/busqueda.html",
    "html/offline.html"
    
]



self.addEventListener('install', (event) => {
    console.log('sw instalado', event);
    caches.open(cacheName).then(cache => {
        cache.addAll(assets);
    });
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(res => {
                if (res) {
                    return res;
                }

                let requestToCache = event.request.clone();
                return fetch(requestToCache)
                    .then(res => {
                        if (!res || res.status !== 200) {
                            console.log(res);
                            return res;
                        }

                        let responseToCache = res.clone();
                        caches.open(cacheName).then(cache => {
                            cache.put(requestToCache, responseToCache);
                        });

                        return res;
                    })
                    .catch(() => {
                        console.error("Error en el match del caché");
                        console.log("Estamos offline, mostrando offline.html");
                        if (navigator.onLine) {
                            // Si estamos offline, devolver la página offline.html
                            return caches.match('/html/offline.html');
                        }
                    });
            })
            .catch(() => {
                console.error("error en el match del caché");
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('sw activado', event);
});



// Evento de notificación push
self.addEventListener('push', (event) => {
    let title = 'Nuevo evento de baile'; // Cambia el mensaje
    let options = {
        body: 'Nuevo evento de baile. Queres recibir recordatorios de los nuevos eventos de baile?', // Cambia la descripción
        icon: "img/eurodance.png",
        vibrate: [500, 300, 500, 300], // milisegundos de vibración en el celular
        tag: 1, // sería un identificador
        actions: [
            {
                action: 1,
                icon: "img/eurodance.png",
                title: 'Acción 1'
            },
            {
                action: 2,
                icon: "img/eurodance.png",
                title: 'Acción 2'
            }
        ]
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Evento de clic en la notificación
self.addEventListener('notificationclick', event => {
    if (event.action === 1) {
        console.log("El usuario hizo clic en la Acción 1");
        // Personaliza el comportamiento para la Acción 1
    } else if (event.action === 2) {
        console.log("El usuario hizo clic en la Acción 2");
        // Personaliza el comportamiento para la Acción 2
    } else {
        console.log("El usuario hizo clic en la notificación sin una acción específica");
        // Personaliza el comportamiento cuando se hace clic en la notificación sin una acción específica
    }
    event.notification.close();
});


// Intercepta la peticion css y modifica el background
// self.addEventListener('fetch', evento => { 
//     if(evento.request.url.includes('style.css')){
//         let respuesta = new Response(`
//             #landing{
//                 width: 100%;
//                 height: 10vh;
//                 background-color: red;
//             }
//         `,
//         {
//             headers:{
//                 'Content-Type': 'text/css'
//             }
//         });
//         evento.respondWith(respuesta);
//     }

// });

// self.addEventListener('fetch', evento => { 

//     if (evento.request.url.includes('.png')) {
//         console.log(evento.request.url);
//         let fotoReq = fetch (evento.request);
//         evento.respondWith(fotoReq);
//     }

// });


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw.js')
//       .then(registration => {
//         console.log('Service Worker registrado con éxito:', registration);
//       })
//       .catch(error => {
//         console.error('Error al registrar el Service Worker:', error);
//       });
//   }