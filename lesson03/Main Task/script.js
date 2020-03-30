let money,
    income = '5000',
    addExpenses,
    deposit = true,
    mission = 5000000,
    period = 7,
    budgetDay = money / 30;

/*
console.log(typeof money);
console.log(typeof deposit);
console.log(typeof income);

console.log(addExpenses.length);

console.log('Период равен ' + period + 'мес.');
console.log('Цель заработать ' + mission + '$');

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);
*/

function moneyEnter(){
    let prev = +prompt('Ваш месячный доход?');
    if(!isNaN(prev)){
        money = prev;
    }else{
        alert('Нужно вводить ЧИСЛА!');
        moneyEnter();
    }
}

//moneyEnter();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');

console.log(addExpenses);
