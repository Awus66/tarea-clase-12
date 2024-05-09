const URL = `https://pokeapi.co/api/v2/pokemon/`;
const POKEMONS_PER_PAGE = 12;

const $nextPage = document.querySelector('#next-page');
const $previousPage = document.querySelector('#previous-page');
const $modal = document.querySelector("#modal");
const $modalContent = document.querySelector("#modal-content");
const $currentPage = document.querySelector('#current-page');
const $totalPages = document.querySelector('#total-pages');
const $pokemons = document.querySelector('#pokemons');
const $closeButton = document.querySelector('.close');
let pokemonCount = 0;

setPagesAmount();


$closeButton.onclick = function() {
    $modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function setPagesAmount() {
    fetch(URL)
    .then(response => response.json())
    .then(response => {
        const fetchPromises = [];

        for (let i = 1; i <= response["count"]; i++) {
            fetchPromises.push(
                fetch(`${URL}${i}`)
                .then(response => response.json())
                .then(pokemon => {
                    if(pokemon){
                        pokemonCount++;
                        allPokemons.push(pokemon);
                    }
                })
                .catch(error => {
                    console.error('Error fetching Pokémon with ID:', i, error);
                })
            );
        }

        Promise.all(fetchPromises)
        .then(() => {
            const totalPages = Math.ceil(pokemonCount / POKEMONS_PER_PAGE);
            $totalPages.value = totalPages;
            document.querySelector('#loading-spinner').style.display = 'none';
            showPokemons();
        });
    });
}

function clearPokemons(){
    $pokemons.innerHTML = ''; 
}


function showModal(pokemon) {
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


function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
