'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('select-cities'),
        dropDownList = document.querySelector('.dropdown-lists__col'),
        chooseCountryList = document.querySelector('.dropdown-lists__countryBlock'),
        dropDownBlock = document.querySelector('.dropdown-lists__list--default'),
        selectBlock = document.querySelector('.dropdown-lists__list--select'),
        autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
        goButton = document.querySelector('.button'),
        closeButton = document.querySelector('.close-button'),
        mainField = document.querySelector('.main'),
        allLists = document.querySelector('.dropdown'),
        lists = document.querySelector('.dropdown-lists'),
        loader = document.querySelector('.loader09');

    goButton.classList.add('disabled');
    goButton.setAttribute('target', '_blank');

    //Function for finding cookie by name
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    //Function for writing cookie into browser
    function setCookie(name, value, options = {}) {

        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
      
        document.cookie = updatedCookie;
    };
    
    //Function for deleting cookie by name
    function deleteCookie(name) {
        setCookie(name, "", {
          'max-age': -1
        })
      }

    //Sorting array with cities of each country
    const getCitiesTop = (citiesArr) => {
        citiesArr.sort((a, b) => (+a.count) - (+b.count));
    };

    //Animation list function
    const animate = (reverse = false) => {
        let num = lists.offsetLeft;
        let width = (dropDownList.clientWidth + 6) * -1;

        if(!reverse){
            requestAnimationFrame(function indexInt(){

                if(lists.offsetLeft > width){
                    num -= 20;
    
                    lists.style.left = num + 'px';
                    requestAnimationFrame(indexInt);
                }
            });
        }else{
            requestAnimationFrame(function indexInt(){

                if(lists.offsetLeft !== 0){
                    num += 20;
    
                    lists.style.left = num + 'px';
                    requestAnimationFrame(indexInt);
                }
            });
        }

    };

    //Filling main block dy countries and top3 citys-list
    const countryChartRender = (arr) => {
        if(arr[0].country === "Russia"){
            [arr[0], arr[2]] = [arr[2], arr[0]];
        }else if(arr[0].country === "Russland"){
            [arr[0], arr[1]] = [arr[1], arr[0]];
        }
console.log(arr);
        let arrForLocStor = JSON.stringify(arr);

        localStorage.setItem('countryData', arrForLocStor);

        input.addEventListener('click', () => {
            dropDownList.innerHTML = '';

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
                                        `;

                for(let i = 0; i < top.length; i++){
                    let div = document.createElement('div');
                    div.classList.add('dropdown-lists__line');

                    if(i === 0){
                        div.innerHTML = `<div class="dropdown-lists__city dropdown-lists__city--ip">${top[i].name}</div>
                                    <div class="dropdown-lists__count">${top[i].count}</div>`;

                        countryBlock.append(div);
                    }else{
                        div.innerHTML = `<div class="dropdown-lists__city dropdown-lists__city">${top[i].name}</div>
                                    <div class="dropdown-lists__count">${top[i].count}</div>`;

                        countryBlock.append(div);
                    }
                }
                
                dropDownList.append(countryBlock);
            });

            if(input.value.length === 0){
                dropDownBlock.style.display = 'block';
            }
    
        });

       

        mainField.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('main')){
                dropDownBlock.style.display = 'none';
                selectBlock.style.display = 'none';
                autocompleteList.style.display = 'none'
                closeButton.style.display = 'none';

                input.value = '';
            }

        });

        closeButton.addEventListener('click', () => {
            closeBtnHandler();
        });
        
        return arr;
    };

    //Funcion for rendering choose city list
    const renderCitiesList = (countryObj) => {
        let cityArr = countryObj.cities.reverse();

        input.value = countryObj.country;
        input.focus();

        chooseCountryList.innerHTML = '';
        
        cityArr.forEach(city => {
            let block = document.createElement('div');

            block.classList.add('dropdown-lists__line');

            block.innerHTML = `<div class="dropdown-lists__city">${city.name}</div>
                                <div class="dropdown-lists__count">${city.count}</div>
                                `;

            chooseCountryList.append(block);
        });

        dropDownBlock.style.display = 'block';
        selectBlock.style.display = 'block';
        closeButton.style.display = 'block';
    };

    //Close button click handler function
    const closeBtnHandler = () => {
        input.value = '';

        dropDownBlock.style.display = 'block';

        animate(true);

        closeButton.style.display = 'none';
        // selectBlock.style.display = 'none';


        goButton.setAttribute('href', '#');
        goButton.classList.add('disabled');
    };

    //Function for handling clicks to cities in different fields
    const cityClickHandler = (target, arrayOfCities) => {
        if(target.classList.contains('dropdown-lists__line')){
            input.value = target.firstChild.textContent;

            let fakeInputEvent = new Event("input");

            input.dispatchEvent(fakeInputEvent);
            input.focus();

            dropDownBlock.style.display = 'none';
            selectBlock.style.display = 'none';
            autocompleteList.style.display = 'block';
            closeButton.style.display = 'block';
        }else if(target.classList.contains('dropdown-lists__city')){
            input.value = target.textContent;   

            let fakeInputEvent = new Event("input");

            input.dispatchEvent(fakeInputEvent);
            input.focus();

            dropDownBlock.style.display = 'none';
            selectBlock.style.display = 'none';
            autocompleteList.style.display = 'block';
            closeButton.style.display = 'block';
        }

        let currentCityObj = arrayOfCities.find(obj => {
            if(obj.name === input.value.trim()){
                return true;
            }
        });
        
        goButton.classList.remove('disabled');
        goButton.setAttribute('href', `${currentCityObj.link}`);

    };

    //Function for finding chosing country and all cities information
    const countryChoose = (countriesArr) => {
        let array = countriesArr.map(obj => obj.cities);
        let cityArr = [];


        array.forEach(arr => {
            cityArr = cityArr.concat(arr);
        })

        dropDownList.addEventListener('click', (event) => {
            const target = event.target;

            if(target.classList.contains('dropdown-lists__total-line') || target.classList.contains('dropdown-lists__country')){
                countriesArr.forEach(obj => {
                   if(target.textContent.includes(obj.country)){
                        renderCitiesList(obj);
                        animate();
                    }
                });
            }else{
                cityClickHandler(target, cityArr);
            }

        });

        selectBlock.addEventListener('click', (event) => {
            let target = event.target;

            cityClickHandler(target, cityArr);
            lists.style.left = '0px';
        });

        autocompleteList.addEventListener('click', (event) => {
            let target = event.target;

            cityClickHandler(target, cityArr);
        });

        return countriesArr;
    };

    //Live search of most suitable cities for request
    const liveSearch = (allCityNames) => {
        autocompleteList.innerHTML = '';

        let resArr = allCityNames.filter(item => {
            let pattern = item.toLowerCase().slice(0, input.value.length);

            if(pattern === input.value.toLowerCase()){
                return true;
            }
        });

        if(resArr.length === 0){
            let block = document.createElement('div');

            block.classList.add('dropdown-lists__line');
            block.innerHTML = `<div class="dropdown-lists__city">Ничего не найдено</div>
                                `;

            autocompleteList.append(block);
        }else{
            resArr.forEach(item => {
                let block = document.createElement('div');
    
                block.classList.add('dropdown-lists__line');
                block.innerHTML = `<div class="dropdown-lists__city">${item}</div>
                                    `;
    
                autocompleteList.append(block);
            })
        }
    };

    //Show most suitables cities during input event
    const citiesShow = (array) => {
        let allCities  = [];

        array.forEach(obj => {
            allCities = allCities.concat(obj.cities);
        });

        let cityNamesArr = allCities.map(obj => obj.name);

        input.addEventListener('input', () => {
            let flag = false;

            (input.value.length === 1) ? flag = true : flag = false;

            if(input.value.length > 0){
                liveSearch(cityNamesArr);
            }else{
                dropDownBlock.style.display = 'block';

                animate(true);
                // selectBlock.style.display = 'none';
                autocompleteList.style.display = 'none';
                closeButton.style.display = 'none';

                goButton.setAttribute('href', '#');
                goButton.classList.add('disabled');
            }

            if(flag){
                dropDownBlock.style.display = 'none';
                selectBlock.style.display = 'none';
                autocompleteList.style.display = 'block';
            }
        });

        return array;
    };

    //Key requst validator
    const inputValidator = () => {
        let countryKey = prompt('Выберите язык :(RU|DE|EN)');

        if(countryKey){
            countryKey = countryKey.trim().toLowerCase();
        }
    
        if(countryKey && countryKey.length === 2){
            switch(countryKey){
                case 'ru':
                    countryKey = 'RU';
                    break;
                case 'en':
                    countryKey = 'EN';
                    break;
                case 'de':
                    countryKey = 'DE';
                    break;
                default:
                    inputValidator();
            }
        }else if(countryKey === null){
            countryKey = null;
        }else{
            inputValidator();
        }

        return countryKey; 
    };

    //Function for init app
    const initFunction = (key = 'RU') => {
        const response =  fetch(`http://localhost:3000/${key}`);

        loader.style.display = 'block';

        if(response){
            setTimeout(() => {
                response
                .then(response => {
                    if(response.ok && response.status === 200){
                        let obj = response.json();

                        return obj;
                    }
                })
                .then(countryChartRender)
                .then(countryChoose)
                .then(citiesShow)
                .finally(() => {
                    loader.style.display = 'none';
                })
                .catch(error => console.error(error));
            }, 3000);
        }
    }

    //Check for cookie file
    const cookieCheck = () => {
        let cookaName = 'countryCode';
        let cook = getCookie(cookaName);
        let cityArr = localStorage.getItem('countryData');

        if(cityArr){
            cityArr = JSON.parse(cityArr);
        }

        if(cook){
            countryChartRender(cityArr);
            countryChoose(cityArr);
            citiesShow(cityArr);
        }else{
            cook = inputValidator();

            if(cook){
                setCookie(cookaName, cook);
                initFunction(cook);
            }
        }
    };
    
    cookieCheck();

    // deleteCookie('countryCode');
    // localStorage.removeItem('countryData');
});



