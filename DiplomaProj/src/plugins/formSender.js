class Sender{
    constructor(selector){
        this.form = document.querySelector(selector);
        this.check = false;
        this.formInputs;
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

            if(!window.fetch){
                if(this.check){
                    this.ieFormSender(this.body);
                }
            }else{
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
                        console.error(error);
                    })
                    .finally(
                        this.clearInputs()
                    );
                }
    
            }
        });

        this.form.addEventListener('input', (event) => {
            let target = event.target;

            if(target.getAttribute('name') === 'name'){
                this.wordsValidator(target);
            }else if(target.getAttribute('name') === 'phone'){
                this.numsValidator(target);
                try{
                    this.maskPhone('.feedback-block__form-input_phone');
                    this.maskPhone('.feedback__input-input');
                }catch(e){
                    console.error(e);
                };
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
            let elems = document.querySelectorAll(selector);

            // if(!window.fetch){
            //     elems = document.getElementsByClassName(selector);
            // }else{
            //     elems = document.querySelectorAll(selector);
            // }
        
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
        
            for(let i = 0; i < elems.length; i++){
                elems[i].addEventListener("input", mask);
                elems[i].addEventListener("focus", mask);
                elems[i].addEventListener("blur", mask);
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

        this.ieFormSender = (body) => {
            this.request = new XMLHttpRequest();

            this.request.addEventListener('readystatechange', () => {
                if(this.request.readyState !== 4){
                    return;
                }

                if(this.request.status === 200){
                    const popUpThanksWindow = document.querySelector('.popup-thank-bg');
    
                    popUpThanksWindow.style.visibility = 'visible';
                    popUpThanksWindow.style.cursor = 'pointer';

                    popUpThanksWindow.addEventListener('click', () => {
                        popUpThanksWindow.style.visibility = 'hidden';
                    });
                }else{
                    console.error(this.request.status);
                }
            });

            this.request.open('POST', './server.php');
            this.request.setRequestHeader('Content-Type', 'aplication/json');
            this.request.send(JSON.stringify(body));
        };

    };
} 

export default Sender;
