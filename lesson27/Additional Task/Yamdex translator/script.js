document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const changeLangBtn = document.querySelector('.change-lang'),
        translateBtn = document.querySelector('.translate'),
        basicPequstStr = 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        apiKey = 'trnsl.1.1.20200506T173157Z.8c6dbc8cb9b7d2dc.1cd79b878920fee4ca7f61f10d566bebe37c1078',
        enRuDirection = 'en-ru',
        ruEnDirection = 'ru-en';

    const translateIt = (url) => {
        return fetch(url);
    };

    translateBtn.addEventListener('click', () => {
        const input = document.querySelector('.input'),
            output = document.querySelector('.output-field');

        let url = `${basicPequstStr}?lang=${ruEnDirection}&key=${apiKey}&text=${input.value}`;

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