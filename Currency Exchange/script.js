const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');

const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rateText = document.getElementById('rate');
const swap = document.getElementById('swap-btn');

currency_one.addEventListener('change', calculateMoney);
currency_two.addEventListener('change', calculateMoney);
amount_one.addEventListener('input', calculateMoney);
amount_two.addEventListener('input', calculateMoney);



function calculateMoney() {
    const one = currency_one.value;
    const two = currency_two.value;
    let url = `https://api.exchangerate-api.com/v4/latest/${one}`;
    fetch(url).then(res => res.json()).then(data => {
        const rate = data.rates[two];
        rateText.innerText = `1 ${one} = ${rate} ${two}`;    
        amount_two.value = (amount_one.value * rate);
    }) 
    
}

// Swap Currency //
swap.addEventListener('click',()=>{
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculateMoney();
})

calculateMoney();