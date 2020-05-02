'use strict';

class Sender{
    constructor(selector){
        this.form = document.querySelector(selector);
        this.errorMessage = 'Что-то пошло не так...';
        this.successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';

        this.statusMessage = document.createElement('div');
        this.statusMessage.classList.add('preloader-wrap');
    }

    init(){
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.form.appendChild(this.statusMessage);
            this.statusMessage.innerHTML = `<div class="load-container">
                                                <div class="dash uno"></div>
                                                <div class="dash dos"></div>
                                                <div class="dash tres"></div>
                                                <div class="dash cuatro"></div>
                                            </div>`;
            this.formData = new FormData(this.form);

            this.body = {};

            this.formData.forEach((val, key) => {
                this.body[key] = val;
            });

            this.postData(this.body)
                .then(succsess => {
                    this.showResMessage(this.successMessage);
                    console.log(succsess);
                })
                .catch(error => {
                    this.showResMessage(this.errorMessage);
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

        this.postData = (body) => {

            return new Promise((resolve, reject) => {
                this.request = new XMLHttpRequest();

                this.request.addEventListener('readystatechange', () => {

                    if(this.request.readyState !== 4){
                        return;
                    }

                    if(this.request.status === 200){
                        resolve(this.request);
                    }else{
                        reject(this.request.statusText);
                    }
                });

                this.request.open('POST', './server.php');
                this.request.setRequestHeader('Content-Type', 'aplication/json');
                
                this.request.send(JSON.stringify(body));
            });
        };

        this.showResMessage = (messageTxt) => {
            this.statusMessage.innerHTML = `<p>${messageTxt}</p>`;
            this.clearInputs();
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
            target.value = this.value.replace(/[^+\d]/, '');
        };

        this.wordsValidator = (target) => {
            this.val = target.value;
            target.value = this.val.replace(/[^а-я\s\.]/, '');
        }
    };
}