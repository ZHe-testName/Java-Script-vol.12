'use strict'

//duration === period с урока
let money = 0;

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 0,
    budget: 0,
    budgetDay: 0,
    budgetMounth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    duration: 3,

    asking: function(){
        if(confirm('Есть ли у Вас дополнительный источник зароботка?')){
            let itemIncome = prompt('Источник Вашего дополнительного дохода?');
            let cashIncome = prompt('Сколько в месяц Вы на етом зарабаываете?');

            appData.income[itemIncome] = cashIncome;
        }

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.').
        toLowerCase().split(',');

        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        if(appData.deposit){
            appData.percentDeposit = prompt('Какой годовой процент депозита?');
            appData.moneyDeposit = prompt('Какая сумма залога?');
        }

        for(let i = 0; i < 2; i++){
            let toKey = prompt('Введите обязательную статью расходов.');
            let toVal = prompt('Во сколько это обойдется?');
            appData.expenses[toKey] = toVal;
            
            while(!isItNumber(toVal)){
                toVal = prompt('Во сколько это обойдется?');
                appData.expenses[toKey] = toVal;
            }
        }

        appData.getExpensesMounth(appData.expenses);
    },


    getBudget: function(){
        appData.budgetMounth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMounth / 30);
    },

    getTargetMounth: function(){
        appData.period = Math.ceil(appData.mission / appData.budgetMounth);
    },

    getStatusIncome: function(){
        if(appData.budgetDay >= 120){
            console.log('У Вас высокий уровень дохода.');
        }else if(appData.budgetDay < 120 && appData.budgetDay >= 60){
            console.log('У Вас средний уровень дохода.');
        }else if(appData.budgetDay < 60 && appData.budgetDay >= 0){
            console.log('К сожалению у Ваш уровень дохода ниже среднего.');
        }else{
            console.log('Что-то пошло не так...');
        }
    },

    getExpensesMounth: function(obj){
        for(let key in obj){
           appData.expensesMonth += +obj[key];
        }
    },

    getSavedMoney: function(){
        return appData.budgetMounth * appData.duration;
    }
}

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

////////////////////////////////////////////

money = start();
appData.budget = money;

appData.asking();

appData.getBudget();


console.log('Расходы за месяц : ' + appData.expensesMonth);

appData.getTargetMounth();

(appData.period < 0 || !isFinite(appData.period)) ? console.log('Цель не будет достигнута.') :
console.log('Цель будет достигнута за : ' + appData.period + ' месяцев.');

appData.getStatusIncome();

console.log('Наша программа включает в себя такие данные : ' );
for(let key in appData){
    console.log(key,  appData[key]);
}

console.log(appData.getSavedMoney());
