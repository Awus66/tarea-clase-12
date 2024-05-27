import * as ui from './ui/ui.js'
import { setIDs, showPokemons } from './api/api.js';

const $nextPage = document.querySelector('#next-page');
const $previousPage = document.querySelector('#previous-page');
const $currentPage = document.querySelector('#current-page');


initialize();

$previousPage.onclick = ui.previousPage;
$nextPage.onclick = ui.nextPage;
$currentPage.addEventListener('change', ()=> {
    validateCurrentPage();
    showPokemons();
});


async function initialize() {
    await setIDs();
    await ui.setPagesAmount();
    await showPokemons();
}