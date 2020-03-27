'use strict'

let money = 5000,
    income = '5000',
    addExpenses = 'Жрачка, Тачка, Кот',
    deposit = true,
    mission = 5000000,
    period = 7,
    budgetDay = money / 30;

console.log(typeof money);
console.log(typeof deposit);
console.log(typeof income);

console.log(addExpenses.length);

console.log('Период равен ' + period + 'мес.');
console.log('Цель заработать ' + mission + '$');

console.log(addExpenses.toLowerCase().split());

console.log(budgetDay);


