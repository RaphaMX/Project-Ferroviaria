export const key = 'sVlhDI8WWG3HH0VkOgJw';
export const initCoord = [-23.35018, -47.83471];
export const initZoom = 11;
export const bounds = L.latLngBounds(
    L.latLng(-23.083542, -47.326492), // Sudeste
    L.latLng(-24.237445, -49.678096) // Noroeste
);

//#region Init map & constraints

export const map = L.map('map', {
    center: initCoord,
    zoom: initZoom,
    minZoom: initZoom,
    maxZoom: 19
});

map.setMaxBounds(bounds);
map.on('drag', () => {
    map.panInsideBounds(bounds);
});

map.on('popupopen', (e) => {
    const popup = e.popup;
    const popupLatLng = popup.getLatLng();
    
    map.panTo(popupLatLng);
    const bounds = L.latLngBounds(popupLatLng, popupLatLng);
    map.fitBounds(bounds, {
        padding: [50, 50]
    });
});

//#endregion

//#region Render Map

const mtLayer = L.maptilerLayer({
    apiKey: key,
    style: "cab73bfd-eab3-4432-8a9d-19325ba13059",
}).addTo(map);

const railwayLayer = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

//#endregion

// Dados das estações ferroviárias
const estacoes = [
    {
        nome: "Estação Ferroviária de Cerquilho",
        coordenadas: [-23.16301, -47.74396],
        popup: `
        <h3>Estação Ferroviária de Cerquilho</h3>
        <p>Esta é uma descrição da estação.</p>
        <img src="https://www.saaec.com.br/wp-content/uploads/estacao_trem-940x360.jpg" 
             class="popup-image" alt="cerquilho">
    `
    },
    {
        nome: "Estação Ferroviária de Boituva",
        coordenadas: [-23.28396, -47.67555],
        popup: `
            <h3>Estação Ferroviária de Boituva</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="https://lh4.googleusercontent.com/proxy/jjtV2H9BLpINKMXOwii9CywkQedi-IkGDju8No295J7Mz0g_SX0UXji0eBiPGj82-BtjxTjlBlRzTbBPsRKWVjXQoV3jQPLFr3-NTn52ZP06" 
                 class="popup-image" alt="boituva">
        `
    },
    {
        nome: "Estação Ferroviária de Iperó",
        coordenadas: [-23.35135, -47.68629],
        popup: `
            <h3>Estação Ferroviária de Iperó</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="https://lh4.googleusercontent.com/proxy/wa8VO_T6_B9yZSNwh02n9cPHLyVxRN6BwR55Jw1gSvMomHklkxaRmhR0Hy-cmdt4ls66Te3SATAJkUUJN1cDGJITPo4zvwwWXLVf2VM1jQ" 
                 class="popup-image" alt="ipero">
        `
    },
    {
        nome: "Estação Ferroviária de Tatuí",
        coordenadas: [-23.35018, -47.83471],
        popup: `
            <h3>Estação Ferroviária de Tatuí</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="https://oprogressodetatui.com.br/wp-content/uploads/2020/10/Estacao-Ferroviaria-5.jpg" 
                 class="popup-image" alt="tatui">
        `
    },
    {
        nome: "Estação Ferroviária de Itapetininga",
        coordenadas: [-23.583563, -48.047711],
        popup: `
            <h3>Estação Ferroviária de Itapetininga</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="https://lh5.googleusercontent.com/proxy/1lO9evwlWYOMgb52D3REL8l1mPotuVf6jBGf2eBuecveQJbv-fWxN8JQ73uBdYX9yzJAPzs7xldSFsVN55vGciJvAgAjbOuDbkU6fnpHGQxmZho_4FA" 
                 class="popup-image" alt="itapetininga">
        `
    },
    {
        nome: "Estação Ferroviária de Sorocaba",
        coordenadas: [-23.49621, -47.45456],
        popup: `
            <h3>Estação Ferroviária de Sorocaba</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="https://lh3.googleusercontent.com/proxy/zjz3Ev_gKu3sER9ITQDBGpR6L9XJ8WqrMuJ8Ek7yv-xk-ZOi3zATMa5w7pDge93wM7f5em1RQhAgdlF_7Okn3NN6p6-fDh9MVqGcpyi_BeqR" 
                 class="popup-image" alt="sorocaba">
        `
    },
    {
        nome: "Estação Ferroviária de Itararé",
        coordenadas: [-24.11869, -49.33831],
        popup: `
            <h3>Estação Ferroviária de Itararé</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="https://lh4.googleusercontent.com/proxy/lUakl2ZnSL4x7a57YHiJwdfBEKndnvREqnxbXvYUwRJUCDzOI1KK2kS0Fm6-gZSJcjGQwaupmbQ7nNM6nBJGgoM2HcsrB50wDR_31rZOGCfl" 
                 class="popup-image" alt="itarare">
        `
    }
];

estacoes.forEach(estacao => {
    L.marker(estacao.coordenadas).addTo(map).bindPopup(estacao.popup);
});

const legend = L.control({position: 'bottomleft'});

const btn = L.control({position: 'topleft'})
btn.onAdd = () => {
   const div = L.DomUtil.create('div', 'button')
    div.innerHTML = `<a href="#" class="reset-button"><i class="fa fa-compass" aria-hidden="true"></i></a>`
    return div
}

btn.addTo(map)

legend.onAdd = () => {
  const div = L.DomUtil.create('div', 'legend');
  div.innerHTML = `
    <h2>Legenda</h2>
    <p><img src="./assets/images/legend1.png" alt="principal"> Ferrovia principal</p>
    <p><img src="./assets/images/legend2.png" alt="abandon"> Linha abandonada</p>
    <p><img src="./assets/images/legend3.png" alt="demolished"> Linha demolida</p>
  `;
  return div;
};

legend.addTo(map);