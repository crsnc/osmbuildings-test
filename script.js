// 1. Haritayı başlat (Antalya örnek koordinatları)
var map = L.map('map').setView([36.8841, 30.7056], 17);

// 2. OpenStreetMap katmanı ekle
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. OSMBuildings başlat
var osmb = new OSMBuildings(map).load();

// 4. Otel binası eklemek için GeoJSON örneği
osmb.addGeoJSON({
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [30.7048, 36.8838],
        [30.7052, 36.8838],
        [30.7052, 36.8842],
        [30.7048, 36.8842],
        [30.7048, 36.8838]
      ]
    ]
  },
  properties: {
    height: 20,       // bina yüksekliği metre cinsinden
    minHeight: 0,     // zemin yüksekliği
    roofColor: "#ff0000" // çatının rengi
  }
});
