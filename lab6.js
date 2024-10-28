function createMap() {
    const map = L.map('map').setView([35, -96], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    return map;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1; // Convert to number
}

const coord = [];
for (let c = 0; c < 3; c++) {
    const latitude = getRandomInRange(30, 35, 3);
    const longitude = getRandomInRange(-100, -90, 3);
    coord.push([latitude, longitude]);
}

async function marker(map) {
    for (let i = 0; i < coord.length; i++) {
        const [latitude, longitude] = coord[i];
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await response.json();
            const marker = L.marker([latitude, longitude]).addTo(map);
            document.getElementById(`Marker${i + 1}`).innerHTML += `Latitude: ${latitude}, Longitude: ${longitude}<br>Locality: ${data.locality || 'Not found'}<br>`;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    map.fitBounds(coord);
}

window.onload = () => {
    const map = createMap(); 
    marker(map);
};
