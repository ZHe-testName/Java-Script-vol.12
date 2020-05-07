'use strict';

class Validator{
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.formElements = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && 
            item.type !== 'button';
        });
        this.errors = new Set();
    }

    init(){
        this.setPatern();
        this.formElements.forEach(element => element.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', event => {
            this.formElements.forEach(element => this.checkIt({target: element}));
            if(this.errors.size){
                event.preventDefault();
            }
        })
    }

    isValid(elem){
        const validatorsMethod = {
            notEmpty(elem){
                if(elem.value.trim() === ''){
                    return false;
                }

                return true;
            },

            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };

        if(this.method){
            const method = this.method[elem.id];

            if(method){
                return method.every(item => validatorsMethod[item[0]](elem, this.pattern[item[1]]));
            }
        }else{
            console.warn('Необходимо задать id полей ввода и задать методы их проверки.');
        }

        return true;
    }

    checkIt(event){
        const target = event.target;

        if(this.isValid(target)){
            this.showSuccess(target);
            this.errors.delete(target);
        }else if(target.value === ''){
            target.classList.remove('success');
            target.classList.remove('error');

            if(target.nextElementSibling && target.nextElementSibling.classList.contains('validator-error')){
                target.nextElementSibling.remove();
            }
        }else{
            this.showError(target);
            this.errors.add(target);
        }
    }

    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');

        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            return;
        }

        const errorDiv = document.createElement('div');

        errorDiv.textContent = 'Здесь ошибочка!';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem){
        elem.classList.remove('error');
        elem.classList.add('success');

        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }

    setPatern(){
        if(!this.pattern.phone){
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        
        if(!this.pattern.email){
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }

        if(!this.pattern.text){
            this.pattern.text = /[а-я]/i;
        }
    }
};