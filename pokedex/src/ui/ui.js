import { pokemonCount, showPokemons} from '../api/api.js';

export const POKEMONS_PER_PAGE = 12;

export const $currentPage = document.querySelector('#current-page');
const $totalPages = document.querySelector('#total-pages');


export function validateCurrentPage(){
    const currentPage = Number($currentPage.value);
    const totalPages = Number($totalPages.value);
    if(currentPage < 1){
        $currentPage.value = 1;
    }
    if(currentPage > totalPages){
        $currentPage.value = totalPages;
    }
}


export function nextPage(){
    if (Number($currentPage.value) < Number($totalPages.value)){
        $currentPage.value = Number($currentPage.value) + 1;
        showPokemons();
    }
}


export function previousPage(){
    if ($currentPage.value > 1){
        $currentPage.value = Number($currentPage.value) - 1;
        showPokemons();
    }

}



export async function setPagesAmount() {
    const totalPages = Math.ceil(pokemonCount / POKEMONS_PER_PAGE);
    $totalPages.value = totalPages;
    document.querySelector('#loading-spinner').style.display = 'none';
    return Promise.resolve();
}