const key = 'sVlhDI8WWG3HH0VkOgJw';
const map = L.map('map').setView([-23.35018, -47.83471], 10);
const mtLayer = L.maptilerLayer({
    apiKey: key,
    style: "cab73bfd-eab3-4432-8a9d-19325ba13059",
}).addTo(map);

let railwayLayer = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy;'
}).addTo(map);

let stCerq = L.marker([-23.16301, -47.74396]).addTo(map).bindPopup("Estação Ferroviária de Cerquilho");
let stBoit = L.marker([-23.28396, -47.67555]).addTo(map).bindPopup("Estação Ferroviária de Boituva");
let stIpero = L.marker([-23.35135, -47.68629]).addTo(map).bindPopup("Estação Ferroviária de Iperó");
let stTatui = L.marker([-23.35018, -47.83471]).addTo(map).bindPopup("Estação Ferroviária de Tatuí");
let stItape = L.marker([-23.583563, -48.047711]).addTo(map).bindPopup("Estação Ferroviária de Itapetininga");
let stSoro = L.marker([-23.49621, -47.45456]).addTo(map).bindPopup("Estação Ferroviária de Sorocaba");
let stItar = L.marker([-24.11869, -49.33831]).addTo(map).bindPopup("Estação Ferroviária de Itararé");