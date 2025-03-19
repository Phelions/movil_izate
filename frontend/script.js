var map = L.map('map').setView([-33.4489, -70.6693], 13); // Coordenadas de Santiago de Chile

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var trayectoId = null;
var tiempoTranscurrido = 0;
var intervaloTiempo = null;
var intervaloUbicacion = null;

function iniciarRastreo(vehicleId) {
    fetch(`http://localhost:8080/api/trayectos/iniciar/${vehicleId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del backend:", data);
        trayectoId = data.id;
        console.log("ID del trayecto guardado:", trayectoId);
        document.getElementById('trayecto-id').textContent = "ID del Trayecto: " + trayectoId;
        intervaloTiempo = setInterval(actualizarTiempo, 1000);
        intervaloUbicacion = setInterval(obtenerUbicacion, 5000); // Inicia la obtención de ubicaciones cada 5 segundos
    })
    .catch(error => {
        console.error("Error al iniciar el rastreo:", error);
        mostrarMensaje("Error al iniciar el rastreo.");
    });
}
function obtenerUbicacion() {
    if (trayectoId) {
        const latitud = -33.445526; // Reemplazar con la latitud real
        const longitud = -70.658882; // Reemplazar con la longitud real
        console.log("Enviando latitud:", latitud, "longitud:", longitud);
        fetch(`http://localhost:8080/api/trayectos/ubicacion/${trayectoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitud: latitud,
                longitud: longitud
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ubicación del vehículo:", data);
            if (data && data.latitud && data.longitud) {
                actualizarMapa(data.latitud, data.longitud);
            } else {
                console.error("Coordenadas no válidas recibidas del backend.");
            }
        })
        .catch(error => {
            console.error("Error al obtener la ubicación:", error);
        });
    } else {
        console.error("No se ha iniciado un trayecto.");
    }
}

var marker = null;

function actualizarMapa(latitud, longitud) {
    if (latitud && longitud) {
        if (marker) {
            marker.setLatLng([latitud, longitud]);
            marker.setPopupContent(`<b>ID del Vehículo:</b> ${document.getElementById('vehicle-id').value}<br><b>Hora:</b> ${new Date().toLocaleTimeString()}`);
        } else {
            marker = L.marker([latitud, longitud]).addTo(map);
            marker.bindPopup(`<b>ID del Vehículo:</b> ${document.getElementById('vehicle-id').value}<br><b>Hora:</b> ${new Date().toLocaleTimeString()}`).openPopup();
        }
        map.setView([latitud, longitud], 15);
    } else {
        console.error("Latitud o longitud no válidas.");
    }
}

function actualizarTiempo() {
    tiempoTranscurrido++;
    document.getElementById('tiempo-transcurrido').textContent = "Tiempo Transcurrido: " + tiempoTranscurrido + " segundos";
}

document.getElementById('finalizar-recorrido').addEventListener('click', function() {
    if (trayectoId) {
        fetch(`http://localhost:8080/api/trayectos/finalizar/${trayectoId}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del backend (Finalizar Recorrido):", data);
            mostrarMensaje("Recorrido finalizado con éxito.");
            clearInterval(intervaloTiempo); // Detiene el contador
            clearInterval(intervaloUbicacion);
        })
        .catch(error => {
            console.error("Error al finalizar el recorrido:", error);
            mostrarMensaje("Error al finalizar el recorrido.");
        });
    } else {
        console.error("No se ha iniciado un trayecto.");
        mostrarMensaje("No se ha iniciado un trayecto.");
    }
});

function mostrarMensaje(mensaje) {
    document.getElementById('mensaje').textContent = mensaje;
}

var vehicleForm = document.getElementById('vehicle-form');
vehicleForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var vehicleId = document.getElementById('vehicle-id').value;
    console.log("ID del vehículo:", vehicleId);
    iniciarRastreo(vehicleId);
});