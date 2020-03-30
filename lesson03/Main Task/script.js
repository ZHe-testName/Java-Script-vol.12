let money,
    amount1,
    amount2,
    income = '5000',
    addExpenses,
    deposit,
    mission = 5000000,
    period = 0,
    budgetDay = 0;

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

function isItNumber(x){
    let prev = +prompt('Во сколько это обойдется?');

    while(isNaN(prev)){
        alert('Нужно вводить только ЧИСЛА!');
        prev = +prompt('Во сколько это обойдется?');
    }
    
    x = prev;
    return x;
}

moneyEnter(money);

//addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
//deposit = confirm('Есть ли у Вас депозит в банке?');
//let expenses1 = prompt('Введите обязательную статью расходов.');
amount1 = isItNumber(amount1);

//let expenses2 = prompt('Введите обязательную статью расходов.');
amount2 = isItNumber(amount2);

let budgetMounth = money - (amount1 + amount2);
console.log(budgetMounth);

period = Math.ceil(mission / budgetMounth);
console.log(period);

budgetDay = Math.floor(budgetMounth / 30);
console.log(budgetDay);



