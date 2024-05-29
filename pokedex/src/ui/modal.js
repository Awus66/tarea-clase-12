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
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <p>ID: ${pokemon.id}</p>
        <p>Height: ${Number(pokemon.height)/10} m</p>
        <p>Weight: ${Number(pokemon.weight)/10} kg</p>
        <p>Type: ${pokemon.types.map(type => capitalize(type.type.name)).join(", ")}</p>
        <p>Abilities: ${pokemon.abilities.map(ability => capitalize(ability.ability.name).replace(/-/g, " ")).join(", ")}</p>
    `;
    $modal.style.display = "block";
}