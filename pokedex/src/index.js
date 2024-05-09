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
