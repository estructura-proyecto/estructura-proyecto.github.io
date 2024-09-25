// Inicializar el mapa centrado en España
const map = L.map('map').setView([40.4168, -3.7038], 6);

// Añadir capa de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para crear un popup de evento con la información completa
function createPopup(evento) {
    return `
        <h3>${evento['EVENTO']}</h3>
        <p><strong>Fecha:</strong> ${evento['FECHA']}</p>
        <p><strong>Lugar:</strong> ${evento['LUGAR']}</p>
        <p><strong>Categoría:</strong> ${evento['CATEGORIA']}</p>
        <p><strong>Descripción:</strong> ${evento['DESCRIPCIÓN']}</p>
    `;
}

// Cargar y procesar el archivo CSV
Papa.parse('Junio2025.csv', {
    download: true,
    header: true,
    complete: function(results) {
        results.data.forEach(evento => {
            // Convertir las coordenadas (lat, lon) de la columna F
            const coords = evento['COORDENADAS'].replace(/[()]/g, '').split(',').map(coord => parseFloat(coord.trim()));
            
            // Añadir marcador al mapa
            const marker = L.marker(coords).addTo(map);

            // Añadir evento de clic para mostrar la ficha del evento
            marker.bindPopup(createPopup(evento));

            // Mostrar evento al pasar el cursor sobre el marcador
            marker.on('mouseover', function() {
                marker.openPopup();
            });
        });
    }
});
