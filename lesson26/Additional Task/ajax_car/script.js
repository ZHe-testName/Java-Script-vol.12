document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const showChoise = (data) => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }else if(select.value === 'no'){
                output.innerHTML = `выбери тачку!`;
            }
        });
    };

    select.addEventListener('change', () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();

            request.addEventListener('readystatechange', () => {
                
                if (request.readyState !== 4){
                    return;
                }

                if(request.status === 200){
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                }else {
                    reject('Произошла ошибка');
                }
            });

        })
        .then(showChoise)
        .catch(error => {
            output.innerHTML = error;
        })
        
    });

});