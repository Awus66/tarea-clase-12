loadSymbols();
const $symbol = document.querySelector('#symbol');


function loadSymbols () {
    fetch('https://api.frankfurter.app/currencies')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).forEach(symbol =>{
            const $newSymbol = document.createElement('option');
            $newSymbol.value = symbol;
            $newSymbol.innerText = symbol;
            $symbol.appendChild($newSymbol);
        });
    });
}
