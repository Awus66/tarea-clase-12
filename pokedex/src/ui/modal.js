import { capitalize } from '../utilities/utilities.js';

const $modal = document.querySelector("#modal");
const $modalContent = document.querySelector("#modal-content");
const $closeButton = document.querySelector('.close');


$closeButton.onclick = function() {
    $modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        $modal.style.display = "none";
    }
}


export function showModal(pokemon) {
    $modalContent.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprite}" alt="${pokemon.name}" />
        <p>ID: ${pokemon.id}</p>
        <p>Height: ${pokemon.height/10} m</p>
        <p>Weight: ${pokemon.weight/10} kg</p>
        <p>Type: ${pokemon.types}</p>
        <p>Abilities: ${pokemon.abilities}</p>
    `;
    $modal.style.display = "block";
}