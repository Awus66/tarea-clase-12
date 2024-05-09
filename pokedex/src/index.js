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

