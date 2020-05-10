'use strict';

let response = fetch('http://localhost:3000/RU');


response
    .then(response => {
        if(response.ok){
            console.log(response.json(), response.ok);
        }
    })
    .catch(error => console.error(error));


