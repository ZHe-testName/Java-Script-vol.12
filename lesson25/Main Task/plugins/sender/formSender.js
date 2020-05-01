'use strict';

class Sender{
    constructor(selector){
        this.form = document.querySelector(selector);
        this.errorMessage = 'Что-то пошло не так...';
        this.loadingMessage = 'Загрузочка...';
        this.successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';
        this.statusMessage = document.createElement('div');
        this.statusMessage.style.cssText = `font-size: 21px;
                                            color: white;`;
    }

    init(){
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.form.appendChild(this.statusMessage);
            this.statusMessage.textContent = this.loadingMessage;
            this.formData = new FormData(this.form);

            this.body = {};

            this.formData.forEach((val, key) => {
                this.body[key] = val;
            });

            this.postData(this.body, () => {
                this.statusMessage.textContent = this.successMessage;
                this.clearInputs();
            }, (error) => {
                this.statusMessage.textContent = this.errorMessage;
                this.clearInputs();
                console.error(error);
            });

        });

        this.form.addEventListener('input', (event) => {
            this.target = event.target;

            if(this.target.name === 'user_phone'){
                this.numsValidator(this.target);
            }else if(this.target.name === 'user_name' || this.target.name === 'user_message'){
                this.wordsValidator(this.target);
            }
        })

        this.postData = (body, outputData, errorData) => {
            this.request = new XMLHttpRequest();

            this.request.addEventListener('readystatechange', () => {

                if(this.request.readyState !==4){
                    return;
                }

                if(this.request.status === 200){
                    outputData();
                }else{
                    errorData(this.request.status);
                }
            });

            this.request.open('POST', './server.php');
            this.request.setRequestHeader('Content-Type', 'aplication/json');
            
            this.request.send(JSON.stringify(body));
        };

        this.clearInputs = () => {
            this.formElems = this.form.elements;

            for(let elem of this.formElems){
                if(elem.tagName.toLowerCase() === 'input'){
                    elem.value = '';
                }
            }
            
        };

        this.numsValidator = (target) => {
            this.value = target.value;
            console.log(this.value);
            target.value = this.value.replace(/[^+\d]/, '');
        };

        this.wordsValidator = (target) => {
            this.val = target.value;
            console.log(this.val);
            target.value = this.val.replace(/[^а-я\s\.]/, '');
        }
    };
}