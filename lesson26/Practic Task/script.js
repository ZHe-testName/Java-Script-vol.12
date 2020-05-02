'use strict';

const output = document.getElementById('output');

//With XMLHttpRequest API

// const getData = (url, outputData) => {

//     const request = new XMLHttpRequest();
//     request.open('GET', url);

//     request.addEventListener('readystatechange', () => {
//         if(request.readyState !== 4){
//             return;
//         }

//         if(request.status === 200){
//             const response = JSON.parse(request.responseText);
//             outputData(response);
//         }else{
//             console.error(request.statusText);
//         }
//     });

//     request.send();
// };


// const outputPhotos = (data) => {
//     let rundom = Math.floor(Math.random() * data.length);
//     let obj = data[rundom];
//     output.innerHTML = `<h2>${obj.title}</h2>
//                         <img src="${obj.url}"> <alt>${obj.title}</alt>`
// };

// getData('https://jsonplaceholder.typicode.com/photos', outputPhotos);


//With Promise API

const getData = (url) => {

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('readystatechange', () => {
            if(request.readyState !== 4){
                return;
            }

            if(request.status === 200){
                const response = JSON.parse(request.responseText);
                resolve(response);
            }else{
                reject(request.statusText);
            }
        });

        request.send();
        })
};


const outputPhotos = (data) => {
    data.forEach(item => {
        output.insertAdjacentHTML('beforebegin',
            `<h5>${item.title}</h5>
            <img src="${item.thumbnailUrl}"> <alt>${item.title}</alt>` );
    });
};

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
    twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

// oneImg
//     .then(outputPhotos)
//     .catch(error => console.error(error));

// twoImg
//     .then(outputPhotos)
//     .catch(error => console.error(error));

// Promise.race([oneImg, twoImg])
//     .then(outputPhotos)
//     .catch(error => console.error(error));

Promise.all([oneImg, twoImg])
    .then(outputPhotos)
    .catch(error => console.error(error));
