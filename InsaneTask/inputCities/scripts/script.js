'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('select-cities'),
        dropDownList = document.querySelector('.dropdown-lists__col'),
        chooseCountryList = document.querySelector('.dropdown-lists__countryBlock'),
        dropDownBlock = document.querySelector('.dropdown-lists__list--default'),
        selectBlock = document.querySelector('.dropdown-lists__list--select'),
        autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
        goButton = document.querySelector('.button');

    goButton.setAttribute('disable', 'disabled');

    //Sorting array with cities of each country
    const getCitiesTop = (citiesArr) => {
        citiesArr.sort((a, b) => (+a.count) - (+b.count));
    };

    //Filling main block dy countries and top3 citys-list
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

    //Funcion for rendering choose city list
    const renderCitiesList = (countryObj) => {
        let cityArr = countryObj.cities.reverse();

        chooseCountryList.innerHTML = `<div class="dropdown-lists__total-line">
                                            <div class="dropdown-lists__country">${countryObj.country}</div>
                                            <div class="dropdown-lists__count">${countryObj.count}</div>
                                        </div>
                                        `;
        
        cityArr.forEach(city => {
            let block = document.createElement('div');

            block.classList.add('dropdown-lists__line');

            block.innerHTML = `<div class="dropdown-lists__city">${city.name}</div>
                                <div class="dropdown-lists__count">${city.count}</div>
                                `;

            chooseCountryList.append(block);
        });


        dropDownBlock.style.display = 'none';
        selectBlock.style.display = 'block';
    };

    //Function for finding chosing country and all cities information
    const countryChoose = (countriesArr) => {
        dropDownList.addEventListener('click', (event) => {
            const target = event.target;

            if(target.classList.contains('dropdown-lists__total-line') || target.classList.contains('dropdown-lists__country')){
                countriesArr.forEach(obj => {
                   if(target.textContent.includes(obj.country)){
                        renderCitiesList(obj);
                    }
                });


            }
        });

        return countriesArr;
    };

    const liveSearch = (allCityNames) => {

    };

    const citiesShow = (array) => {
        let allCities  = [];

        array.forEach(obj => {
            allCities = allCities.concat(obj.cities);
        });

        let cityNamesArr = allCities.map(obj => obj.name);

        input.addEventListener('input', () => {
            liveSearch(cityNamesArr);
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

            return array;
        })
        .then(countryChoose)
        .then(citiesShow)
        .catch(error => console.error(error));

});



