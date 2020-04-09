'use strict'

//duration === period с урока

////////////// DOM Elements Variable Block ///////////////

let buttonCalculate = document.getElementById('start'),
    addIncomeButton = document.querySelector('.income>button'),
    addExpensesButton = document.querySelector('.expenses>button'),
    depositCheckBox = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelectRange = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items');

/////////////////////////////////////////////////////////

//////////////appData Object///////////////

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    incomeMonth: 0,
    deposit: false,
    period: 0,
    budget: 0,
    budgetDay: 0,
    budgetMounth: 0,
    expensesMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,

    start: function(){
        if(salaryAmount.value === ""){
            alert("Ошибка! Заполните поле 'Месячный доход'!");
            return;
        }
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getExpensesMounth(appData.expenses);
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getTargetMounth();

        appData.getBudget();

        appData.showResults();
    },

    showResults: function(){
        budgetMonthValue.value = appData.budgetMounth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.period;
        incomePeriodValue.value = appData.calcPeriod();
    },

    addExpensesBlock: function(){
        let expensesItemClone = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(expensesItemClone, addExpensesButton);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            addExpensesButton.style.display = 'none';
        }
    },

    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }  
        })
    },

    getIncome: function(){
        if(confirm('Есть ли у Вас дополнительный источник зароботка?')){
            let itemIncome = prompt('Источник Вашего дополнительного дохода?');
            while(!isItString(itemIncome)){
                itemIncome = prompt('Источник Вашего дополнительного дохода?');
            }

            let cashIncome = prompt('Сколько в месяц Вы на етом зарабаываете?');
            while(!isItNumber(cashIncome)){
                cashIncome = prompt('Сколько в месяц Вы на етом зарабаываете?');
            }

            appData.income[itemIncome] = cashIncome;

            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        }
    },

    getAddExpenses: function(){
        let addExpension = additionalExpensesItem.value.split(',');

        addExpension.forEach(function(item){
            item = item.trim();

            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },

    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();

            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    },

    getBudget: function(){
        appData.budgetMounth = (appData.budget + appData.incomeMonth) - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMounth / 30);
    },

    getTargetMounth: function(){
        appData.period = Math.ceil(targetAmount.value / appData.budgetMounth);
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

    calcPeriod: function(){
        return appData.budgetMounth * periodSelectRange.value;
    }
}

/////////////////////////////////////////////////////

function isItNumber(num){
    if(!isNaN(parseFloat(num)) && isFinite(num)){
        return true;
    }else{
        alert('Нужно вводить только числа!');
    }
}

function isItString(variable){
    if(isNaN(variable)){
        return true;
    }else{
        alert('Здесь нельзя вводить числа!');
    }
}


////////////////////////////////////////////

buttonCalculate.addEventListener('click', appData.start);

addExpensesButton.addEventListener('click', appData.addExpensesBlock);

/*
appData.budget = money;

appData.asking();




console.log('Расходы за месяц : ' + appData.expensesMonth);

appData.getTargetMounth();

(appData.period < 0 || !isFinite(appData.period)) ? console.log('Цель не будет достигнута.') :
console.log('Цель будет достигнута за : ' + appData.period + ' месяцев.');

appData.getStatusIncome();

console.log('Наша программа включает в себя такие данные : ' );
for(let key in appData){
    console.log(key,  appData[key]);
}

console.log(appData.addExpenses.map(item => item[0].toUpperCase() + item.substring(1)).join(', '));
*/
