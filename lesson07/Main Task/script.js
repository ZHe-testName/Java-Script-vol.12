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
    daysInMounth = 30,
    expenses = [];

/////////////////////////////////

function isItNumber(num){
    if(!isNaN(parseFloat(num)) && isFinite(num)){
        return true;
    }else{
        alert('Нужно вводить толбко числа!');
    }
}

function start(){
    let prev;

    do{
        prev = prompt('Ваш месячный доход?');
    }
    while(!isItNumber(prev));

    return prev;
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

const getExpensesMonth = function(){
    let sum = 0;

    for(let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов.');
        let temp = prompt('Во сколько это обойдется?');
        
        while(!isItNumber(temp)){
            temp = prompt('Во сколько это обойдется?');
        }

        sum += +temp;
    }

    return sum;
};

function getAccumulatedMonth(income, mounthExpenses){
    return income - mounthExpenses;
}

function getTargetMounth(target, mounthIncome){
    return target / mounthIncome;
}

////////////////////////////////////////////

money = start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.').toLowerCase().split(',');
deposit = confirm('Есть ли у Вас депозит в банке?');
console.log('Возможные расходы : ' + addExpenses);

let expensesAmount = getExpensesMonth();
console.log(expenses, expensesAmount);

let accumulatedMounth = getAccumulatedMonth(money, expensesAmount);
console.log('Чистый месячный доход : ' + accumulatedMounth);

console.log('Расходы за месяц : ' + expensesAmount);

period = Math.ceil(getTargetMounth(mission, accumulatedMounth));

(period < 0 || !isFinite(period)) ? console.log('Цель не будет достигнута.') :
console.log('Цель будет достигнута за : ' + period + ' месяцев.');

budgetDay = Math.floor(accumulatedMounth / 30);
console.log('Бютжет на день : ' + budgetDay);

showRez(budgetDay);





