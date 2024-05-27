import { showModal } from '../ui/modal.js';
import { $currentPage, POKEMONS_PER_PAGE } from '../ui/ui.js';
import { capitalize, clear } from '../utilities/utilities.js';

const URL = `https://pokeapi.co/api/v2/pokemon/`;
const $pokemons = document.querySelector('#pokemons');
export let pokemonCount = 0;
export const pokemonsIDs = [];


export async function setIDs() {
    return fetch(`${URL}/?limit=1302&offset=0`)
    .then(response => response.json())
    .then(response => {
        pokemonCount = response.count;
        for (let i = 0; i < pokemonCount; i++){
            const pokemonURL = response.results[i].url
            const parts = pokemonURL.split("/");
            const pokemonID = Number(parts[parts.length - 2].replace(/\D/g, ""));

            pokemonsIDs.push(pokemonID);
        }
    });
}


export async function showPokemons(){
    clear($pokemons);

    const startingPokemon = (($currentPage.value - 1) * POKEMONS_PER_PAGE) + 1;
    const endingPokemon = Math.min(startingPokemon + POKEMONS_PER_PAGE, pokemonCount);

    const fetchPromises = [];

    for(let i = startingPokemon; i < endingPokemon; i++){
        const pokemonID = pokemonsIDs[i - 1];
        fetchPromises.push(
            fetch(`${URL}${pokemonID}`)
            .then(response => response.json()));
        }

        return Promise.all(fetchPromises)
        .then(pokemonData => {
            pokemonData.forEach(pokemon => {
                const name = pokemon["name"];
                const sprite = pokemon["sprites"]["front_default"];

                const newPokemon = document.createElement('div');
                newPokemon.classList.add('pokemon');
    
                const pokemonName = document.createElement('p');
                pokemonName.innerText = capitalize(name);
    
                const pokemonImage = document.createElement('img');
                pokemonImage.src = sprite;
    
                newPokemon.appendChild(pokemonImage);
                newPokemon.appendChild(pokemonName);

                newPokemon.addEventListener("click", function() {
                    showModal(pokemon);
                });
            
    
                $pokemons.appendChild(newPokemon);
            });
        });
}