import L from 'leaflet'

export function initializeMap(mapId, lat, lng) {
  const map = L.map(mapId).setView([lat, lng], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  L.marker([lat, lng]).addTo(map).openPopup()
}
