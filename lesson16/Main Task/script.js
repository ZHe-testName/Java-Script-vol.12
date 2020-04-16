'use strict'

////////////// DOM Elements Variable Block ///////////////

const buttonCalculate = document.getElementById('start'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelectRange = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancelButton = document.querySelector('#cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

const strExp = /[\w]/;
const numExp = /[a-zA-Zа-яА-Я]/;

/////////////////////////////////////////////////////////

//////////////appData Object///////////////

class AppData{
    constructor(){
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

    start(){

        this.budget = +salaryAmount.value;
    
        this.getExpIncUnited();
        this.getExpIncMounthUnited(this.expenses);
        this.getAddExpInUnited();
        this.getExpIncMounthUnited(this.income);
        this.getTargetMounth();
        this.getInfoDeposit();
    
        this.getBudget();
    
        this.showResults();
        this.inputsBlocker();
    };
    
    showResults(){
        budgetMonthValue.value = this.budgetMounth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.period;
        incomePeriodValue.value = this.calcPeriod();
    
        periodSelectRange.addEventListener('input', () => incomePeriodValue.value = this.calcPeriod());
    };
   
    addIncOrExpBlock(e){
        if(e.target.className === 'btn_plus income_add'){
            let incomeItemClone = incomeItems[0].cloneNode(true);

            incomeItemClone.childNodes.forEach(item => item.value = '');
            incomeItemClone.firstElementChild.addEventListener('input', this.validateStr);
            incomeItemClone.lastElementChild.addEventListener('input', this.validateNums);
        
            incomeItems[0].parentNode.insertBefore(incomeItemClone, addIncomeButton);
            incomeItems = document.querySelectorAll('.income-items');
        
            if(incomeItems.length === 3){
                addIncomeButton.style.display = 'none';
            }
        }else if(e.target.className === 'btn_plus expenses_add'){
            let expensesItemClone = expensesItems[0].cloneNode(true);
        
            expensesItemClone.childNodes.forEach(item => item.value = '');
            expensesItemClone.firstElementChild.addEventListener('input', this.validateStr);
            expensesItemClone.lastElementChild.addEventListener('input', this.validateNums);
        
            expensesItems[0].parentNode.insertBefore(expensesItemClone, addExpensesButton);
            expensesItems = document.querySelectorAll('.expenses-items');
        
            if(expensesItems.length === 3){
                addExpensesButton.style.display = 'none';
            }
        }
    };
   
    getExpIncUnited(){
        const count = item => {
            const selectorStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${selectorStr}-title`).value;
            const itemAmount = item.querySelector(`.${selectorStr}-amount`).value;

            if(itemTitle !== '' && itemAmount !== ''){
                this[selectorStr][itemTitle] = itemAmount;
            }  
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);
    };

    getAddExpInUnited(){
        const addExpension = additionalExpensesItem.value.split(',');

        const addFunc = item => {
            if(typeof(item) === 'object'){
                let itemValue = item.value.trim();
    
                if(itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            }else if(typeof(item) === 'string'){
                item = item.trim();

                if(item !== ''){
                    this.addExpenses.push(item);
                }
            }
        };

        addExpension.forEach(addFunc);
        additionalIncomeItem.forEach(addFunc);

    };
    
    inputsBlocker(){
        let data = document.querySelector('.data'),
            allInputs = data.querySelectorAll('input[type="text"]');
    
        allInputs.forEach(item => item.setAttribute('readonly', true));
    
        buttonCalculate.style.display = 'none';
        cancelButton.style.display = 'block';
    };
    
    reset(){
        let allInputs = document.querySelectorAll('input[type="text"]'),
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
        depositCheckBox.checked = false;
        depositAmount.style.display = 'none';
        depositBank.style.display = 'none';
        depositPercent.style.display = 'none';
        depositAmount.value = '';
        depositBank.value = '';
    };

    depositHandler(){
        if(depositCheckBox.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        }else{
            depositBank.style.display = 'none';
            depositBank.value = '';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);

        }
    };

    getInfoDeposit(){
        if(this.deposit === true){
            this.percentDeposit = (depositBank.value === 'other') ? depositPercent.value : depositBank.value;
            this.moneyDeposit = depositAmount.value;
            console.log(this.percentDeposit);
        }
    };

    changePercent(){
        const selectValue = this.value;

        if(selectValue === 'other'){
            depositPercent.style.display = 'inline-block';
        }else{
            depositPercent.value = selectValue;
            depositPercent.style.display = 'none';
        }
    }   

    changeRangeNumber(){
        periodAmount.innerText = periodSelectRange.value;
    };
    
    getBudget(){
        const mounthDeposit = this.percentDeposit * (this.moneyDeposit / 100);
        this.budgetMounth = (this.budget + this.incomeMonth) - this.expensesMonth + mounthDeposit;
        this.budgetDay = Math.floor(this.budgetMounth / 30);
    };
    
    getTargetMounth(){
        this.period = Math.ceil(targetAmount.value / this.budgetMounth);
    };
    
    getStatusIncome(){
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

    getExpIncMounthUnited(obj){
        if(obj === this.income){
            for(let key in obj){
                this.incomeMonth += +obj[key];
            }
        }else if(obj === this.expenses){
            for(let key in obj){
                this.expensesMonth += +obj[key];
            }
        }
    };
    
    calcPeriod(){
        return this.budgetMounth * periodSelectRange.value;
    };
    
    turnOnButton(){
        if(salaryAmount.value.length == 0){
            buttonCalculate.setAttribute('disabled', 'disabled');
        }else if(salaryAmount.value.length > 0){
            buttonCalculate.removeAttribute('disabled');
        }   
    };
    
    validateStr(){
        let str = String(this.value);
    
        if(strExp.test(str)){
            alert('Здесь можно вводить только русский текст.');
            this.value = str.substr(0, str.length - 1);
        }
    };
    
    validateNums(){
        let numStr = String(this.value);
    
        if(numExp.test(numStr)){
            alert('Здесь можно вводить только цифры.');
            this.value = numStr.substr(0, numStr.length - 1);
        }
    };

    depositValidator(){
        if(depositPercent.value > 100 || depositPercent.value < 0 || numExp.test(depositPercent.value)){
            alert('Вводите корректное значение процентов депозита!');
            depositPercent.value = depositPercent.value.substr(0, depositPercent.value.length - 1);
            buttonCalculate.setAttribute('disabled', 'disabled');
        }else if(salaryAmount.value.length > 0){
            buttonCalculate.removeAttribute('disabled');
        }
    };
    
    eventListeners(){
    
        additionalIncomeItem.forEach(item => item.addEventListener('input', this.validateStr));
    
        expensesItems[0].firstElementChild.addEventListener('input', this.validateStr);
        expensesItems[0].lastElementChild.addEventListener('input', this.validateNums);
    
        incomeItems[0].firstElementChild.addEventListener('input', this.validateStr);
        incomeItems[0].lastElementChild.addEventListener('input', this.validateNums);
    
        salaryAmount.addEventListener('input', this.turnOnButton);
    
        salaryAmount.addEventListener('input', this.validateNums);
    
        buttonCalculate.addEventListener('click', this.start.bind(this));
    
        addExpensesButton.addEventListener('click', this.addIncOrExpBlock.bind(this));
        
        addIncomeButton.addEventListener('click', this.addIncOrExpBlock.bind(this));
    
        periodSelectRange.addEventListener('input', this.changeRangeNumber);
    
        cancelButton.addEventListener('click', this.reset.bind(this));

        depositCheckBox.addEventListener('change', this.depositHandler.bind(this));

        depositPercent.addEventListener('input', this.depositValidator);

        depositAmount.addEventListener('input', this.validateNums);
    };

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
