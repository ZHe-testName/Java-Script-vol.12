class Sender{
    constructor(selector){
        this.form = document.querySelector(selector);
        this.errorMessage = 'Что-то пошло не так...';
        this.successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';
        this.check = false;
        this.formInputs;

        // this.statusMessage = document.createElement('div');
        // this.statusMessage.classList.add('preloader-wrap');
    }

    init(){
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.body = {};

            this.formInputs = this.form.querySelectorAll('input');
            
            this.formInputs.forEach(item => {
                if(item.getAttribute('name') === 'phone'){
                    this.body[item.getAttribute('name')] = item.value;
                }else if(item.getAttribute('name') === 'name'){
                    this.body[item.getAttribute('name')] = item.value;
                }
            });

            if(this.check){
                this.postData(this.body)
                .then(response => {
                    if(response.status !== 200){
                        throw(new Error('Network status is not 200.'));
                    }
                    const popUpThanksWindow = document.querySelector('.popup-thank-bg');

                    popUpThanksWindow.style.visibility = 'visible';
                    popUpThanksWindow.style.cursor = 'pointer';

                    popUpThanksWindow.addEventListener('click', () => {
                        popUpThanksWindow.style.visibility = 'hidden';
                    });
                })
                .catch(error => {
                    this.showResMessage(this.errorMessage);
                    console.error(error);
                })
                .finally(
                    this.clearInputs()
                );
            }else{
                console.log('no');
            }

           
        });

        this.form.addEventListener('input', (event) => {
            let target = event.target;

            if(target.getAttribute('name') === 'name'){
                this.wordsValidator(target);
            }else if(target.getAttribute('name') === 'phone'){
                this.numsValidator(target);
                this.maskPhone('.feedback-block__form-input_phone');

            }
        });

        this.form.addEventListener('click', (event) => {
            let target = event.target;

            if(target.getAttribute('type') === 'checkbox' && (!target.hasAttribute('checked'))){
                target.setAttribute('checked', 'checked');
                this.check = !this.check;
            }else if(target.hasAttribute('checked')){
                target.removeAttribute('checked');
                this.check = !this.check;
            }

            if(target.classList.contains('link-privacy')){
                let privacyWindow = document.querySelector('.popup-privacy');

                privacyWindow.style.visibility = 'visible';

                privacyWindow.addEventListener('click', (event) => {
                    let target = event.target;

                    if(target.classList.contains('mobile-hide')){
                        privacyWindow.style.visibility = 'hidden';
                    }
                });
            }
        });

        this.postData = (body) => {

            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(body),
            });
        };

        this.numsValidator = (target) => {
            this.value = target.value;
            target.value = this.value.replace(/[^+\d]/, '');
        };

        this.wordsValidator = (target) => {
            this.val = target.value;
            target.value = this.val.replace(/[^а-я\s\.]/, '');
        };

        this.maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
            const elems = document.querySelectorAll(selector);
        
            function mask(event) {
                const keyCode = event.keyCode;
                const template = masked,
                    def = template.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");
                
                let i = 0,
                    newValue = template.replace(/[_\d]/g, function (a) {
                        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                    });
                i = newValue.indexOf("_");
                if (i != -1) {
                    newValue = newValue.slice(0, i);
                }

                let reg = template.substr(0, this.value.length).replace(/_+/g,
                    function (a) {
                        return "\\d{1," + a.length + "}";
                    }).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");

                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                    this.value = newValue;
                }
                if (event.type == "blur" && this.value.length < 5) {
                    this.value = "";
                }
        
            }
        
            for (const elem of elems) {
                elem.addEventListener("input", mask);
                elem.addEventListener("focus", mask);
                elem.addEventListener("blur", mask);
            }
            
        };

        this.clearInputs = () => {
            this.formElems = this.form.elements;

            for(let elem of this.formElems){
                if(elem.tagName.toLowerCase() === 'input'){
                    elem.value = '';
                }
            }
        
    };

    };
} 

//         this.form.addEventListener('input', (event) => {
//             this.target = event.target;

//             if(this.target.name === 'user_phone'){
//                 this.numsValidator(this.target);
//             }else if(this.target.name === 'user_name' || this.target.name === 'user_message'){
//                 this.wordsValidator(this.target);
//             }
//         })

       


//         this.showResMessage = (messageTxt) => {
//             this.statusMessage.innerHTML = `<p>${messageTxt}</p>`;
//             this.clearInputs();
//         };

//         this.clearInputs = () => {
//             this.formElems = this.form.elements;

//             for(let elem of this.formElems){
//                 if(elem.tagName.toLowerCase() === 'input'){
//                     elem.value = '';
//                 }
//             }
            
//         };

export default Sender;
