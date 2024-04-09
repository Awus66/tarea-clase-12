const $submitButton = document.querySelector('#submit-button');
const $from = document.querySelector('#from');
const $to = document.querySelector('#to');
const $amount = document.querySelector('#amount');
const $startDate = document.querySelector('#start-date');
const $endDate = document.querySelector('#end-date');

//Loads symbols
loadSymbols();

//Sets max value of start and end dates to current time
const currentTime = new Date().toISOString().split("T")[0];
$startDate.max = currentTime;
$endDate.max = currentTime;

document.querySelector('#submit-button').onclick = getData;

function loadSymbols () {
    fetch('https://api.frankfurter.app/currencies')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).forEach(symbol =>{
            const $newFromSymbol = document.createElement('option');
            $newFromSymbol.value = symbol;
            $newFromSymbol.innerText = symbol;
            $from.appendChild($newFromSymbol);

            //Sets default value of "from" to EUR
            if (symbol === 'EUR'){
                $newFromSymbol.selected = true;
            }

            const $newToSymbol = document.createElement('option');
            $newToSymbol.value = symbol;
            $newToSymbol.innerText = symbol;
            $to.appendChild($newToSymbol);
        });
    })
    .catch(error => console.error("FAILED", error));
}


function getData() {
    const $data = document.querySelector('#data');
    cleanErrors();

    if ( !($amount.value > 0 && /^[0-9]+$/.test($amount.value)) ){
        createError($amount, '"Amount" must be a number greater than 0');
    }
    if ($from.value === $to.value){
        $to.value = '';
    }

    if(document.querySelectorAll('.error').length > 0){
        return;
    }
    fetch(getFetch())
    .then(response => response.json())
    .then(response => {
        let dataText = `Exchange Rates for ${$amount.value} ${$from.value} `;

        if (!isEmpty($to)){
            dataText = dataText + `to ${$to.value} `;
        }

        dataText = dataText + `on `

        if (!isEmpty($startDate)){
            dataText = dataText + `${$startDate.value}`;
        }
    
        if (!isEmpty($endDate)){
            dataText = dataText + ` - ${$endDate.value}`;
        }
        else {
            dataText = dataText + `${currentTime}`;
        }

        if ($startDate === $endDate){
            dataText = dataText - ` - ${$endDate.value}`;
        }
        
        $data.innerText = dataText;
        $data.classList.add('fs-4', 'fw-bold');

        const $ratesContainer = document.createElement('span');
        $ratesContainer.id = 'rates';

        Object.entries(response['rates']).forEach(([key, values]) =>{
            const $newRate = document.createElement('li');
            let ratesText;

            if (Object.entries(values).length > 0){
                ratesText = Object.entries(values).map(([currency, value]) => `\n${currency}: ${value}`).join('');
            }
            else{
                ratesText = values;
            }

            $newRate.innerText = `${key}: ${ratesText}`;
            $newRate.classList.add('m-4', 'fs-6', 'lh-sm', 'fw-light');
            $ratesContainer.appendChild($newRate);
        });

        $data.appendChild($ratesContainer);
        $data.style.display = '';
    })
    .catch(error => console.error("FAILED", error));
}


function cleanErrors(){
    document.querySelectorAll('.error').forEach(error => {
        error.classList.remove('error');
    });
    document.querySelector('#errors').innerHTML = '';
}


function createError(element, errorMessage){
    element.classList.add('error');
    const $errors = document.querySelector('#errors');
    const $newItem = document.createElement('li');
    $newItem.innerText = errorMessage;
    $errors.appendChild($newItem);
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
