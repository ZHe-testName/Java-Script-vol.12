'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('select-cities'),
        dropDownList = document.querySelector('.dropdown-lists__col');

    const getCitiesTop = (citiesArr) => {
        citiesArr.sort((a, b) => (+a.count) - (+b.count));
    };

    const countryChartRender = (arr) => {
        input.addEventListener('click', () => {
            arr.forEach(obj => {
                getCitiesTop(obj.cities);
                
                const top = obj.cities.slice(-3).reverse();
                const countryBlock = document.createElement('div');
    
                countryBlock.classList.add('dropdown-lists__countryBlock');
    
                countryBlock.innerHTML = `
                                        <div class="dropdown-lists__total-line">
                                            <div class="dropdown-lists__country">${obj.country}</div>
                                            <div class="dropdown-lists__count">${obj.count}</div>
                                        </div>
                                        <div class="dropdown-lists__line">
                                            <div class="dropdown-lists__city dropdown-lists__city--ip">${top[0].name}</div>
                                            <div class="dropdown-lists__count">${top[0].count}</div>
                                        </div>
                                        <div class="dropdown-lists__line">
                                            <div class="dropdown-lists__city">${top[1].name}</div>
                                            <div class="dropdown-lists__count">${top[1].count}</div>
                                        </div>
                                        <div class="dropdown-lists__line">
                                            <div class="dropdown-lists__city">${top[2].name}</div>
                                            <div class="dropdown-lists__count">${top[2].count}</div>
                                        </div>
                                        `;
    
                dropDownList.append(countryBlock);
            });
    
        });
         
    };
    
    
    
    const response = fetch('http://localhost:3000/RU');


    response
        .then(response => {
            if(response.ok && response.status === 200){
                let obj = response.json();

                return obj;
            }
        })
        .then(array => {
            countryChartRender(array);
        })
        .catch(error => console.error(error));

});



