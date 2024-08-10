import { showModal } from '../ui/modal.js';
import { $currentPage, POKEMONS_PER_PAGE } from '../ui/ui.js';
import { capitalize, clear } from '../utilities/utilities.js';


class Pokemon{
    constructor(data){
        this.name = capitalize(data.name);
        this.sprite = data.sprites.front_default;
        this.id = data.id;
        this.height = Number(data.height);
        this.weight = Number(data.weight);
        this.types = data.types.map(type => capitalize(type.type.name)).join(", ");
        this.abilities = data.abilities.map(ability => capitalize(ability.ability.name).replace(/-/g, " ")).join(", ");
    }
}

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
            pokemonData.forEach(data => {
                const pokemon = new Pokemon(data);

                const newPokemon = document.createElement('div');
                newPokemon.classList.add('pokemon');
    
                const pokemonName = document.createElement('p');
                pokemonName.innerText = pokemon.name;
    
                const pokemonImage = document.createElement('img');
                pokemonImage.src = pokemon.sprite;
    
                newPokemon.appendChild(pokemonImage);
                newPokemon.appendChild(pokemonName);

                newPokemon.addEventListener("click", function() {
                    showModal(pokemon);
                });
            
    
                $pokemons.appendChild(newPokemon);
            });
        });
}