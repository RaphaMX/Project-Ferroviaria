const key = 'sVlhDI8WWG3HH0VkOgJw';

const map = L.map('map').setView([-23.35018, -47.83471], 10);

const mtLayer = L.maptilerLayer({
    apiKey: key,
    style: "cab73bfd-eab3-4432-8a9d-19325ba13059",
}).addTo(map);

const railwayLayer = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

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
            <img src="http://www.estacoesferroviarias.com.br/i/fotos/itapetininga0231.jpg" 
                 class="popup-image" alt="itapetininga">
        `
    },
    {
        nome: "Estação Ferroviária de Sorocaba",
        coordenadas: [-23.49621, -47.45456],
        popup: `
            <h3>Estação Ferroviária de Sorocaba</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="http://www.estacoesferroviarias.com.br/s/fotos/sorocaba071.jpg" 
                 class="popup-image" alt="sorocaba">
        `
    },
    {
        nome: "Estação Ferroviária de Itararé",
        coordenadas: [-24.11869, -49.33831],
        popup: `
            <h3>Estação Ferroviária de Itararé</h3>
            <p>Esta é uma descrição da estação.</p>
            <img src="http://www.estacoesferroviarias.com.br/i/fotos/itarare0121.jpg" 
                 class="popup-image" alt="itarare">
        `
    }
];

// Função para criar marcadores
estacoes.forEach(estacao => {
    L.marker(estacao.coordenadas).addTo(map).bindPopup(estacao.popup);
});