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

            this.request = new XMLHttpRequest();

            this.request.addEventListener('readystatechange', () => {
                this.statusMessage.textContent = this.loadingMessage;

                if(this.request.readyState !==4){
                    return;
                }

                if(this.request.status === 200){
                    this.statusMessage.textContent = this.successMessage;
                }else{
                    this.statusMessage.textContent = this.errorMessage;
                    console.error(this.request.status);
                }
            });

            this.request.open('POST', './server.php');
            this.request.setRequestHeader('Content-Type', 'aplication/json');

            this.formData = new FormData(this.form);

            this.body = {};

            this.formData.forEach((val, key) => {
                this.body[key] = val;
            })
            
            this.request.send(JSON.stringify(this.body));

        });
    };
}