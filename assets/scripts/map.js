export const key = 'sVlhDI8WWG3HH0VkOgJw';
export const initCoord = [-23.35018, -47.83471];
export const initZoom = 11;
export const bounds = L.latLngBounds(
    L.latLng(-23.083542, -47.326492), // Sudeste
    L.latLng(-24.237445, -49.678096) // Noroeste
);

function getTemporaryBounds(popup) {
    const popupLatLng = popup.getLatLng();
    const offset = 0.5; // Ajuste conforme necessário para garantir que o popup caiba
    return L.latLngBounds(
        L.latLng(popupLatLng.lat - offset, popupLatLng.lng - offset),
        L.latLng(popupLatLng.lat + offset, popupLatLng.lng + offset)
    );
}

//#region Init map & constraints

export const map = L.map('map', {
    center: initCoord,
    zoom: initZoom,
    minZoom: initZoom,
    maxZoom: 19
});

map.setMaxBounds(bounds);
map.on('drag', () => {
    if (!map.isPopupOpen()) {
        map.panInsideBounds(bounds);
    }
});

map.on('popupopen', (e) => {
    const popup = e.popup;

    const tempBounds = getTemporaryBounds(popup);

    map.setMaxBounds(tempBounds);
    map.off('drag');

    setTimeout(() => {
        const popupBounds = popup.getBounds();
        if (!map.getBounds().contains(popupBounds)) {
            map.fitBounds(popupBounds, {
                padding: [50, 50],
                animate: true
            });
        }
    }, 100);
});

map.on('popupclose', () => {
    map.setMaxBounds(bounds);
    map.on('drag', () => {
        map.panInsideBounds(bounds);
    });
    map.setView(initCoord, initZoom, {
        animate: true
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
            <p>A estação de Cerquilho foi inaugurada no mesmo dia do ramal para Tietê, em 1883. Este era um ramal curto, que na verdade fez parte do tronco por curto tempo. Com o prolongamento da linha de Cerquilho para diante, Tietê passou a ser um ramal, como aliás era o projetado.</p>
            <p><strong>Data de construção do prédio atual:</strong> 1948</p>
            <p><strong>Uso atual:</strong> Espaço Cidadão (2013)</p>
            <p><strong>Endereço:</strong> Pátio da Estação, S/Nº - Centro</p>
            <img src="https://www.saaec.com.br/wp-content/uploads/estacao_trem-940x360.jpg" 
             class="popup-image" alt="cerquilho">
    `
    },
    {
        nome: "Estação Ferroviária de Boituva",
        coordenadas: [-23.28396, -47.67555],
        popup: `
            <h3>Estação Ferroviária de Boituva</h3>
            <p>A estação de Boituva foi inaugurada como ponta de linha em 1882 e já em 1889 passou a ser a estação de saída para o ramal de Tatuí, que mais tarde, aumentado, passou a ser o ramal de Itararé, segundo da Sorocabana em tamanho. Em 1920, outro curto ramal, para Porto Feliz, também passou a sair da estação.</p>
            <p><strong>Data de construção do prédio atual:</strong> 1933</p>
            <p><strong>Uso atual:</strong> Ponto Turístico (2023)</p>
            <p><strong>Endereço:</strong> Vila Ginasial</p>
            <img src="https://lh4.googleusercontent.com/proxy/jjtV2H9BLpINKMXOwii9CywkQedi-IkGDju8No295J7Mz0g_SX0UXji0eBiPGj82-BtjxTjlBlRzTbBPsRKWVjXQoV3jQPLFr3-NTn52ZP06" 
                 class="popup-image" alt="boituva">
        `
    },
    {
        nome: "Estação Ferroviária de Iperó",
        coordenadas: [-23.35135, -47.68629],
        popup: `
            <h3>Estação Ferroviária de Iperó</h3>
            <p>A atual estação de Iperó, chamada originalmente de Santo Antonio Nova, foi inaugurada em 21/12/1928, em substituição à pequena estação antiga, que ficou fora da linha com a sua retificação, concluída nesse ano. <br> O novo prédio, que é o atual, foi construído muito maior que o antigo, pois, a partir dessa data, o ramal de Itararé passou a sair desta estação, e não mais de Boituva, como o fazia desde 1889.</p>
            <p><strong>Data de construção do prédio atual:</strong> 1928</p>
            <p><strong>Uso atual:</strong> Abandonada (2015)</p>
            <p><strong>Endereço:</strong> Tv. Ferrovarios, 200 - Jardim Novo Horizonte</p>
            <img src="https://lh4.googleusercontent.com/proxy/wa8VO_T6_B9yZSNwh02n9cPHLyVxRN6BwR55Jw1gSvMomHklkxaRmhR0Hy-cmdt4ls66Te3SATAJkUUJN1cDGJITPo4zvwwWXLVf2VM1jQ" 
                 class="popup-image" alt="ipero">
        `
    },
    {
        nome: "Estação Ferroviária de Tatuí",
        coordenadas: [-23.35018, -47.83471],
        popup: `
            <h3>Estação Ferroviária de Tatuí</h3>
            <p>A estação de Tatuí foi aberta em 1889 como ponta de linha do ramal Itararé. Existem fontes que dão a inauguração como tendo sido em 20/04/1888, mais de um ano antes.</p>
            <p><strong>Data de construção do prédio atual:</strong> 1932</p>
            <p><strong>Uso atual:</strong> Fechada (2023)</p>
            <p><strong>Endereço:</strong> Avenida Dr. Salles Gomes com a Rua Chiquinha Rodrigues</p>
            <img src="https://oprogressodetatui.com.br/wp-content/uploads/2020/10/Estacao-Ferroviaria-5.jpg" 
                 class="popup-image" alt="tatui">
        `
    },
    {
        nome: "Estação Ferroviária de Itapetininga",
        coordenadas: [-23.583563, -48.047711],
        popup: `
            <h3>Estação Ferroviária de Itapetininga</h3>
            <p>Aberta em 1895, a estação de Itapetininga foi ponta de linha pelos vários anos em que o ramal esteve com a construção interrompida. <br>O prédio original foi substituído por outro, inaugurado e aberto em 12 de setembro de 1926 e concluído totalmente em 1930. Em 1939, este prédio foi reformado, ganhando o aspecto atual, com linhas mais modernas, mas destoando das outras estações do ramal.</p>
            <p><strong>Data de construção do prédio atual:</strong> 1939</p>
            <p><strong>Uso atual:</strong> Sede do Fundo Social de Solidariedade municipal (2023)</p>
            <p><strong>Endereço:</strong> Pr. Gaspar Ricardo, 1 - Centro</p>
            <img src="https://lh5.googleusercontent.com/proxy/1lO9evwlWYOMgb52D3REL8l1mPotuVf6jBGf2eBuecveQJbv-fWxN8JQ73uBdYX9yzJAPzs7xldSFsVN55vGciJvAgAjbOuDbkU6fnpHGQxmZho_4FA" 
                 class="popup-image" alt="itapetininga">
        `
    },
    {
        nome: "Estação Ferroviária de Sorocaba",
        coordenadas: [-23.49621, -47.45456],
        popup: `
            <h3>Estação Ferroviária de Sorocaba</h3>
            <p>A estação de Sorocaba foi inaugurada em 1875 como o ponto final da linha original da Sorocabana, que não por acaso tem esse nome: a idéia original dos donos era ligar Sorocaba a São Paulo pelo caminho mais curto. Em 1929, o prédio original foi reformado e transformou-se no atual, tornando-se um dos maiores edifícios de toda a linha.</p>
            <p><strong>Data de construção do prédio atual:</strong> 1875</p>
            <p><strong>Uso atual:</strong> Fechada (2017)</p>
            <p><strong>Endereço:</strong> Av. Dr. Afonso Vergueiro, 310 - Centro</p>
            <img src="https://lh3.googleusercontent.com/proxy/zjz3Ev_gKu3sER9ITQDBGpR6L9XJ8WqrMuJ8Ek7yv-xk-ZOi3zATMa5w7pDge93wM7f5em1RQhAgdlF_7Okn3NN6p6-fDh9MVqGcpyi_BeqR" 
                 class="popup-image" alt="sorocaba">
        `
    },
    {
        nome: "Estação Ferroviária de Itararé",
        coordenadas: [-24.11869, -49.33831],
        popup: `
            <h3>Estação Ferroviária de Itararé</h3>
            <p>A estação de Itararé foi inaugurada em 1909, como ponto terminal do ramal que levava seu nome. A primeira estação parece ter sido o que hoje é o armazém; o prédio atual teria sido entregue somente em 1912. A São Paulo-Rio Grande chegou em Itararé quase um ano antes da Sorocabana e o pátio dessa estação foi inaugurado em setembro de 1908.</p>
            <p><strong>Data de construção do prédio atual:</strong> 1912</p>
            <p><strong>Uso atual:</strong> Centro de eventos (2015)</p>
            <p><strong>Endereço:</strong> R. Sebastião Jacopeti, 89 - Centro</p>
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