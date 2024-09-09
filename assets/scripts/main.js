import { initCoord, initZoom, map } from "./map.js";

const button = document.querySelector('.reset-button')
button.onclick = () => {
    map.setView(initCoord, initZoom)}