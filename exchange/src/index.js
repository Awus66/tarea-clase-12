class Exchange{
    constructor(from, to = null, amount = 1 , startDate = null, endDate = null){
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.data = null;
    }


    getFetchURL() {
        let URL = `https://api.frankfurter.app/`;

        if (this.startDate) {
            URL += `${this.startDate}..`;
        }

        if (this.endDate) {
            URL += `${this.endDate}`;
        }

        if (!this.startDate && !this.endDate) {
            URL += `latest`;
        }

        URL += `?from=${this.from}`;

        if (this.from === this.to){
            this.to = null;
        }
        else if (this.to) {
            URL += `&to=${this.to}`;
        }

        URL += `&amount=${this.amount}`;

        return URL;
    }

    async getRates() {
        const $data = document.querySelector('#data');

        fetch(this.getFetchURL())
        .then(response => response.json())
        .then(response => {
            let dataText = `Exchange Rates for ${this.amount} ${this.from} `;
    
            if (this.to){
                dataText = dataText + `to ${this.to} `;
            }
    
            dataText = dataText + `on `
    
            let dataDate;
    
            if (this.startDate){
                dataDate = `${this.startDate}`;
                if (this.endDate){
                    dataDate = dataDate + ` - ${this.endDate}`;
    
                    if (this.startDate === this.endDate){
                        dataDate = `${this.endDate}`;
                    }
                }
                else {
                    dataDate = dataDate + ` - ${currentTime}`;
                }
            }
            else {
                if (this.endDate){
                    dataDate = `${this.endDate}`;
                }
                else {
                    dataDate = `${currentTime}`;
                }
            }
    
            dataText = dataText + dataDate;
            
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

    
}

const $submitButton = document.querySelector('#submit-button');
const $from = document.querySelector('#from');
const $to = document.querySelector('#to');
const $amount = document.querySelector('#amount');
const $startDate = document.querySelector('#start-date');
const $endDate = document.querySelector('#end-date');

loadSymbols();

const currentTime = new Date().toISOString().split("T")[0];
$startDate.max = currentTime;
$endDate.max = currentTime;

document.querySelector('#submit-button').onclick = getExchangeData;

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
    })
    .catch(error => console.error("FAILED", error));
}


function getExchangeData() {
    cleanErrors();

    if ( !($amount.value > 0 && /^[0-9]+$/.test($amount.value)) ){
        createError($amount, '"Amount" must be a number greater than 0');
    }

    if(document.querySelectorAll('.error').length > 0){
        return;
    }

    const exchange = new Exchange($from.value, $to.value, $amount.value, $startDate.value, $endDate.value);
    exchange.getRates();
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
