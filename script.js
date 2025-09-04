// 1. Haritayı başlat (Antalya örnek koordinatları)
var map = L.map('map').setView([36.8841, 30.7056], 17);

// 2. OpenStreetMap katmanı ekle
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. OSMBuildings başlat
var osmb = new OSMBuildings(map).load();

// 4. Örnek Otel Binası GeoJSON (3D olarak eklenir)
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
    height: 20,
    minHeight: 0,
    roofColor: "#ff0000",
    name: "Ana Otel Binası"
  }
});

// 5. Arama Fonksiyonu (OpenStreetMap / Nominatim API)
document.getElementById("searchBtn").addEventListener("click", function(){
  var query = document.getElementById("searchBox").value;
  if(!query) return;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      if(data.length > 0){
        var place = data[0];
        var lat = place.lat;
        var lon = place.lon;

        // Haritada o noktaya git
        map.setView([lat, lon], 18);

        // Marker ekle
        L.marker([lat, lon]).addTo(map)
          .bindPopup(place.display_name)
          .openPopup();
      } else {
        alert("Hiç eşleşme bulunamadı!");
      }
    })
    .catch(err => console.error(err));
});
