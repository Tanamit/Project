
// Ref. element from index.html
const  balance = document.getElementById('balance');
const  money_plus = document.getElementById('moeny_plus');
const  money_minus = document.getElementById('moeny_minus');
const  list = document.getElementById('list');
const  form = document.getElementById('form');
const  text = document.getElementById('text');
const  amount = document.getElementById('amount');



let transactions = [];

function init() {
  list.innerHTML = '';
  transactions.forEach(addDataToList);
  calculateMoney();
}
function addDataToList(transactions) {
  const symbol = transactions.amount < 0 ?'-':'+';
  const status = transactions.amount < 0 ?'minus':'plus';
  const item = document.createElement('li');
  item.classList.add(status);
  item.innerHTML = `${transactions.text}<span>${symbol}${formatNumber(Math.abs(transactions.amount))}</span>
                    <button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
  list.appendChild(item);
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function autoID() {
  return Math.floor(Math.random()*1000000);
}

function calculateMoney() {
  const amounts = transactions.map(transactions=>transactions.amount);
  const total = amounts.reduce((result, item)=>(result += item), 0).toFixed(2);
  

  const income = amounts.filter(item => item > 0).reduce((result, item)=>(result += item), 0).toFixed(2);

  const expense = amounts.filter(item => item < 0).reduce((result, item)=>(result += item), 0).toFixed(2);

  balance.innerText = `฿` +  formatNumber(total);
  money_plus.innerText = `฿` + formatNumber(income);
  money_minus.innerText = `฿` + formatNumber(expense);
}

function removeData(id) {
  transactions = transactions.filter(transactions => transactions.id !== id);
  init();
}

function addTransaction(event) {
  event.preventDefault();
  if(text.value.trim() === '') {
      alert("โปรดใส่ชื่อธุรกรรม");
  } else if (amount.value.trim() === '') {
      alert("โปรดระบุบบจำนวนเงิน")
  } else {
      const data = {
        id : autoID(),
        text : text.value,
        amount : +amount.value
      };
      transactions.push(data);
      addDataToList(data);
      calculateMoney();
      text.value = '';
      amount.value = '';
  };
};

form.addEventListener('submit', addTransaction);


init();
