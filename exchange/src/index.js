const $submitButton = document.querySelector('#submit-button');
const $from = document.querySelector('#from');
const $to = document.querySelector('#to');
const $amount = document.querySelector('#amount');
const $startDate = document.querySelector('#start-date');
const $endDate = document.querySelector('#end-date');

loadSymbols();
const $symbol = document.querySelector('#symbol');


function loadSymbols () {
    fetch('https://api.frankfurter.app/currencies')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).forEach(symbol =>{
            const $newFromSymbol = document.createElement('option');
            $newFromSymbol.value = symbol;
            $newFromSymbol.innerText = symbol;
            $from.appendChild($newFromSymbol);

            if (symbol === 'EUR'){
                $newFromSymbol.selected = true;
            }

            const $newToSymbol = document.createElement('option');
            $newToSymbol.value = symbol;
            $newToSymbol.innerText = symbol;
            $to.appendChild($newToSymbol);
        });
    });
}
function getFetch() {
    let URL = `https://api.frankfurter.app/`;

    if (!isEmpty($startDate)){
        URL = URL + `${$startDate.value}..`;
    }

    if (!isEmpty($endDate)){
        URL = URL + `${$endDate.value}`;
    }

    if (isEmpty($startDate) && isEmpty($endDate)){
        URL = URL + `latest`;
    }

    URL = URL + `?from=${$from.value}`;

    if (!isEmpty($to)){
        URL = URL + `&to=${$to.value}`;
    }

    URL = URL + `&amount=${$amount.value}`;

    // (Remember to validate that from and to can't be the same, otherwise it has to be validated here)

    return URL;

}

function isEmpty(input) {
    if(input.value.length === 0){
        return true;
    }
    else{
        return false;
    }
}
