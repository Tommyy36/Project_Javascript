const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const writeP = document.getElementById('last-value');

const switchBtn = document.getElementById('btn');

fetch('https://api.frankfurter.app/currencies')
.then(resp => resp.json())
.then((data) => {
    display(data);
    // console.log(data)
});

function display(data) {
    const curArray = Object.entries(data);

    for(let i = 0; i < curArray.length; i++) {
        currency_one.innerHTML += `<option value="${curArray[i][0]}">${curArray[i][1]}</option>`
        currency_two.innerHTML += `<option value="${curArray[i][0]}">${curArray[i][1]}</option>`
    }
};

switchBtn.addEventListener('click', () => {
    let currencyOne = currency_one.value;
    let currencyTwo = currency_two.value;

    let value = amountOne.value;
    console.log(currency_one.value);

    if(currencyOne != currencyTwo) {
        convert(currencyOne, currencyTwo, value)
    } else {
       writeP.textContent = `ERORR!! Choose different currencies!!
       Thank you!!`;
       writeP.id = 'error';
    }
});



function convert (currencyOne, currencyTwo, value){
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?amount=${value}&from=${currencyOne}&to=${currencyTwo}`)
    .then(respo => respo.json())
    .then((respo) => {
       amountTwo.value = Object.values(respo.rates);
    writeP.textContent = `${amountOne.value} ${currencyOne} equals to ${Object.values(respo.rates)} ${currencyTwo}`;
    writeP.id = 'last-value';
    });
};










