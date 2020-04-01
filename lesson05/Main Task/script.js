'use strict'

let money = 0,
    amount1 = 0,
    amount2 = 0,
    income = '5000',
    addExpenses = 'Жрачка, Тачка, Кот',
    deposit,
    mission = 500000,
    period = 0,
    budgetDay = 0,
    daysInMounth = 30;


function showTypeOf(data){
    return (typeof(data));
}

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

function getExpensesMonth(a, b){
    return a + b;
}

function getAccumulatedMonth(income, exp1, exp2, callback){
    let expenses = callback(exp1, exp2);
    return income - expenses;
}

function getTargetMounth(target, mounhIncome){
    return target / mounhIncome;
}


console.log(showTypeOf(money));
console.log(showTypeOf(deposit));
console.log(showTypeOf(income));

moneyEnter(money);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.').toLowerCase().split(',');
deposit = confirm('Есть ли у Вас депозит в банке?');
console.log('Возможные расходы : ' + addExpenses);

let expenses1 = prompt('Введите обязательную статью расходов.');
amount1 = isItNumber(amount1);

let expenses2 = prompt('Введите обязательную статью расходов.');
amount2 = isItNumber(amount2);

let accumulatedMounth = getAccumulatedMonth(money, amount1, amount2, getExpensesMonth);
console.log('Чистый месячный доход : ' + accumulatedMounth);

console.log('Расходы за месяц : ' + getExpensesMonth(amount1, amount2));

period = Math.ceil(getTargetMounth(mission, accumulatedMounth));
console.log('Цель будет достигнута : ' + period + ' месяцев.');

budgetDay = Math.floor(accumulatedMounth / 30);
console.log('Бютжет на день : ' + budgetDay);

showRez(budgetDay);





