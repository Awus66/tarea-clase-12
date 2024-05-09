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

$previousPage.onclick = previousPage;
$nextPage.onclick = nextPage;
$currentPage.addEventListener('change', ()=> {
    validateCurrentPage();
    showPokemons();
});


function validateCurrentPage(){
    const currentPage = Number($currentPage.value);
    const totalPages = Number($totalPages.value);
    if(currentPage < 1){
        $currentPage.value = 1;
    }
    if(currentPage > totalPages){
        $currentPage.value = totalPages;
    }
}


function nextPage(){
    if (Number($currentPage.value) < Number($totalPages.value)){
        $currentPage.value = Number($currentPage.value) + 1;
        showPokemons();
    }
}


function previousPage(){
    if ($currentPage.value > 1){
        $currentPage.value = Number($currentPage.value) - 1;
        showPokemons();
    }

}


function showPokemons(){
    clearPokemons();

    const startingID = (($currentPage.value - 1) * POKEMONS_PER_PAGE) + 1;
    const endingID = Math.min(startingID + POKEMONS_PER_PAGE, pokemonCount);

    const fetchPromises = [];

    for(let i = startingID; i < endingID; i++){
        fetchPromises.push(
            fetch(`${URL}${i}`)
            .then(response => response.json()));
        }

        Promise.all(fetchPromises)
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
