'use strict'

let money = 0,
    amount1 = 0,
    amount2 = 0,
    income = '5000',
    addExpenses = 'Жрачка, Тачка, Кот',
    deposit,
    mission = 500000,
    period = 0,
    budgetDay = 0;

console.log(typeof money);
console.log(typeof deposit);
console.log(typeof income);

console.log(addExpenses.length);

console.log('Период равен ' + period + 'мес.');
console.log('Цель заработать ' + mission + '$');

console.log(addExpenses.toLowerCase().split(', '));

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

function showRez(val){
    if(val >= 120){
        console.log('У Вас высокий уровень дохода.');
    }else if(val < 120 && val >= 60){
        console.log('У Вас средний уровень дохода.');
    }else if(val < 60 && val >= 0){
        console.log('К сожалению у Ваш уровень дохода ниже среднего.');
    }else{
        console.log('Что-то пошло не так...');
    }
}

moneyEnter(money);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.').toLowerCase().split(',');
deposit = confirm('Есть ли у Вас депозит в банке?');
console.log(addExpenses);

let expenses1 = prompt('Введите обязательную статью расходов.');
amount1 = isItNumber(amount1);

let expenses2 = prompt('Введите обязательную статью расходов.');
amount2 = isItNumber(amount2);

let budgetMounth = money - (amount1 + amount2);
console.log('Бютжет на месяц : ' + budgetMounth);

period = Math.ceil(mission / budgetMounth);
console.log('Цель будет достигнута : ' + period + ' месяцев.');

budgetDay = Math.floor(budgetMounth / 30);
console.log('Бютжет на день : ' + budgetDay);

showRez(budgetDay);






