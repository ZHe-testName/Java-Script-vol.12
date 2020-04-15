'use strict'

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
    incomeItems = document.querySelectorAll('.income-items'),
    periodSelectRange = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancelButton = document.querySelector('#cancel');

const strExp = /[\w]/;
const numExp = /[a-zA-Zа-яА-Я]/;

/////////////////////////////////////////////////////////

//////////////appData Object///////////////

const AppData = function(){
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMounth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function(){

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMounth(this.expenses); 
    this.getAddExpenses();
    this.getIncome();
    this.getAddIncome();
    this.getIncomeMounth(this.income);
    this.getTargetMounth();

    this.getBudget();

    this.showResults();
    this.inputsBlocker();
};

AppData.prototype.showResults = function(){
    budgetMonthValue.value = this.budgetMounth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.period;
    incomePeriodValue.value = this.calcPeriod();

    periodSelectRange.addEventListener('input', () => incomePeriodValue.value = this.calcPeriod());
};

AppData.prototype.addExpensesBlock = function(){
    let expensesItemClone = expensesItems[0].cloneNode(true);
    const _this = this;

    expensesItemClone.childNodes.forEach(item => item.value = '');
    expensesItemClone.firstElementChild.addEventListener('input', _this.validateStr);
    expensesItemClone.lastElementChild.addEventListener('input', _this.validateNums);

    expensesItems[0].parentNode.insertBefore(expensesItemClone, addExpensesButton);
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
        addExpensesButton.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function(){
    let incomeItemClone = incomeItems[0].cloneNode(true);
    const _this = this;

    incomeItemClone.childNodes.forEach(item => item.value = '');
    incomeItemClone.firstElementChild.addEventListener('input', _this.validateStr);
    incomeItemClone.lastElementChild.addEventListener('input', _this.validateNums);

    incomeItems[0].parentNode.insertBefore(incomeItemClone, addIncomeButton);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
        addIncomeButton.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function(){
    const _this = this;

    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value.trim();
        let cashExpenses = item.querySelector('.expenses-amount').value.trim();

        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }  
    })
};

AppData.prototype.getIncome = function(){
    const _this = this;

    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value.trim();
        let cashIncome = item.querySelector('.income-amount').value.trim();

        if(itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
        }
    })
};

AppData.prototype.getAddExpenses = function(){
    let addExpension = additionalExpensesItem.value.split(',');
    const _this = this;

    addExpension.forEach(function(item){
        item = item.trim();

        if(item !== ''){
            _this.addExpenses.push(item);
        }
    })
};

AppData.prototype.getAddIncome = function(){
    const _this = this;

    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();

        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    })
};

AppData.prototype.inputsBlocker = function(){
    let data = document.querySelector('.data'),
        allInputs = data.querySelectorAll('input[type="text"]');

    allInputs.forEach(item => item.setAttribute('readonly', true));

    buttonCalculate.style.display = 'none';
    cancelButton.style.display = 'block';
};

AppData.prototype.reset = function(){
    let allInputs = document.querySelectorAll('input[type="text'),
        incomeItems = document.querySelectorAll('.income-items'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount');

    periodSelect.value = 1;
    periodAmount.innerText = '1';

    allInputs.forEach(item => {
        item.value = '';
        item.removeAttribute('readonly');
    });

    while(incomeItems.length > 1){
        incomeItems[incomeItems.length - 1].remove();
        incomeItems = document.querySelectorAll('.income-items');
    }

    addIncomeButton.style.display = 'block';

    
    while(expensesItems.length > 1){
        expensesItems[expensesItems.length - 1].remove();
        expensesItems = document.querySelectorAll('.expenses-items');
    }

    addExpensesButton.style.display = 'block';

    this.incomeMonth = 0;
    this.deposit = false;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMounth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    this.addExpenses.length = 0;
    this.addIncome.length = 0;

    for(let key of Object.keys(this.income)){
        delete this.income[key];
    }

    for(let key of Object.keys(this.expenses)){
        delete this.expenses[key];
    }
    
    cancelButton.style.display = 'none';
    buttonCalculate.style.display = 'block';
    buttonCalculate.setAttribute('disabled', 'disabled');
    
};

AppData.prototype.changeRangeNumber = function(){
    periodAmount.innerText = periodSelectRange.value;
};

AppData.prototype.getBudget = function(){
    this.budgetMounth = (this.budget + this.incomeMonth) - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMounth / 30);
};

AppData.prototype.getTargetMounth = function(){
    this.period = Math.ceil(targetAmount.value / this.budgetMounth);
};

AppData.prototype.getStatusIncome = function(){
    if(this.budgetDay >= 120){
        console.log('У Вас высокий уровень дохода.');
    }else if(this.budgetDay < 120 && this.budgetDay >= 60){
        console.log('У Вас средний уровень дохода.');
    }else if(this.budgetDay < 60 && this.budgetDay >= 0){
        console.log('К сожалению у Ваш уровень дохода ниже среднего.');
    }else{
        console.log('Что-то пошло не так...');
    }
};

AppData.prototype.getExpensesMounth = function(obj){
    const _this = this;

    for(let key in obj){
       _this.expensesMonth += +obj[key];
    }
};

AppData.prototype.getIncomeMounth = function(obj){
    const _this = this;

    for(let key in obj){
        _this.incomeMonth += +obj[key];
    }
};

AppData.prototype.calcPeriod = function(){
    return this.budgetMounth * periodSelectRange.value;
};

AppData.prototype.turnOnButton = function(){
    if(salaryAmount.value.length == 0){
        buttonCalculate.setAttribute('disabled', 'disabled');
    }else if(salaryAmount.value.length > 0){
        buttonCalculate.removeAttribute('disabled');
    }   
};

AppData.prototype.validateStr = function(){
    let str = String(this.value);

    if(strExp.test(str)){
        alert('Здесь можно вводить только русский текст.');
        this.value = str.substr(0, str.length - 1);
    }
};

AppData.prototype.validateNums = function(){
    let numStr = String(this.value);

    if(numExp.test(numStr)){
        alert('Здесь можно вводить только цифры.');
        this.value = numStr.substr(0, numStr.length - 1);
    }
};

AppData.prototype.eventListeners = function(){
    const _this = this;

    additionalIncomeItem.forEach(item => item.addEventListener('input', _this.validateStr));

    expensesItems[0].firstElementChild.addEventListener('input', this.validateStr);
    expensesItems[0].lastElementChild.addEventListener('input', this.validateNums);

    incomeItems[0].firstElementChild.addEventListener('input', this.validateStr);
    incomeItems[0].lastElementChild.addEventListener('input', this.validateNums);

    salaryAmount.addEventListener('input', this.turnOnButton);

    salaryAmount.addEventListener('input', this.validateNums);

    buttonCalculate.addEventListener('click', this.start.bind(this));

    addExpensesButton.addEventListener('click', this.addExpensesBlock);

    addIncomeButton.addEventListener('click', this.addIncomeBlock);

    periodSelectRange.addEventListener('input', this.changeRangeNumber);

    cancelButton.addEventListener('click', this.reset.bind(this));
};

const appData = new AppData();
appData.eventListeners();



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
(appData.period < 0 || !isFinite(appData.period)) ? console.log('Цель не будет достигнута.') :
console.log('Цель будет достигнута за : ' + appData.period + ' месяцев.');

console.log('Наша программа включает в себя такие данные : ' );
for(let key in appData){
    console.log(key,  appData[key]);
}

console.log(appData.addExpenses.map(item => item[0].toUpperCase() + item.substring(1)).join(', '));
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
*/
