document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const changeLangBtn = document.querySelector('.change-lang'),
        translateBtn = document.querySelector('.translate'),
        input = document.querySelector('.input'),
        output = document.querySelector('.output-field'),
        basicPequstStr = 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        apiKey = 'trnsl.1.1.20200506T173157Z.8c6dbc8cb9b7d2dc.1cd79b878920fee4ca7f61f10d566bebe37c1078',
        enRuDirection = 'en-ru',
        ruEnDirection = 'ru-en';

    let requestTranslateDir = 'ru-en';

    const translateIt = (url) => {
        return fetch(url);
    };

    changeLangBtn.addEventListener('click', () => {
        const inputH = document.getElementById('input-h'),
            inputC = document.getElementById('input-c'),
            outputH = document.getElementById('output-h'),
            outputC = document.getElementById('output-c');

        if(requestTranslateDir === enRuDirection){
            requestTranslateDir = ruEnDirection;

            inputH.textContent = 'Русский';
            inputC.textContent = 'запрос';
            outputH.textContent = 'Английский';
            outputC.textContent = 'перевод';
            translateBtn.textContent = 'Перевести'
        }else if(requestTranslateDir === ruEnDirection){
            requestTranslateDir = enRuDirection;

            inputH.textContent = 'Russian';
            inputC.textContent = 'request';
            outputH.textContent = 'English';
            outputC.textContent = 'conversion';
            translateBtn.textContent = 'Translate';
        }


    });

    input.addEventListener('input', () => {
        if(requestTranslateDir === enRuDirection){
            input.value = input.value.replace(/[а-яА-Я0-9]/, '');
        }else if(requestTranslateDir === ruEnDirection){
            input.value = input.value.replace(/[a-zA-z0-9]/, '');
        }
        
    })

    translateBtn.addEventListener('click', () => {

        let url = `${basicPequstStr}?lang=${requestTranslateDir}&key=${apiKey}&text=${input.value}`;

        translateIt(url)
        .then(response => {
            if(response.status !== 200){
                throw(new Error('Networc status is not 200.'));
            }

            return (response.json());
        })
        .then(data => {
            output.textContent = '';
            output.textContent = data.text[0];
        })
        .catch(error => console.error(error));
    });
});