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
                .then(responce => {
                    if(responce.status !== 200){
                        throw(new Error('Network status is not 200.'));
                    }

                    this.showResMessage(this.successMessage);
                    console.log(responce);
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

            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(body),
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
};

export default Sender;
