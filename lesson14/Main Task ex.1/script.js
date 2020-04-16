'use strict';

const DomElement = function(selector, height, width, bgCol, fonSize){
    this.selector = selector;
    this.position = 'absolute';
    this.height = height + 'px';
    this.width = width + 'px';
    this.bgCol = bgCol;
    this.fonSize = fonSize + 'px';
};

DomElement.prototype.createElement= function(){
        let element;
        if(this.selector[0] === '.'){
            element = document.createElement('div');
            element.classList.add(this.selector.slice(1));
            element.innerText = "Привет! Я <div>.";
        }else if(this.selector[0] === '#'){
            element = document.createElement('p');
            element.classList.add(this.selector.slice(1));
            element.innerText = "Привет! Я <p>.";
        }

        element.style.cssText = `
                                position: ${this.position};
                                height: ${this.height};
                                width: ${this.width};
                                top: 200px;
                                left: 700px;
                                background-color: ${this.bgCol};
                                font-size: ${this.fonSize};
                                `
        document.body.append(element);
    };

DomElement.prototype.moveElement = function(e){
        let code = e.keyCode;
        let elem = document.querySelector(this.selector);
        let computedObj = getComputedStyle(elem);

        switch(code){
            case 40:
                elem.style.top = (+(computedObj.top.substring(0, computedObj.top.length - 2)) + 10) + 'px';
                break;
            case 38:
                elem.style.top = (+(computedObj.top.substring(0, computedObj.top.length - 2)) - 10) + 'px';
                break;
            case 37:
                elem.style.left = (+(computedObj.left.substring(0, computedObj.left.length - 2)) - 10) + 'px';
                break;
            case 39:
                elem.style.left = (+(computedObj.left.substring(0, computedObj.left.length - 2)) + 10) + 'px';
                break;
        }
    };


const newDiv = new DomElement('.block', 100, 100, 'red', 20);

document.addEventListener("DOMComputedLoaded", newDiv.createElement());
document.addEventListener("keydown", newDiv.moveElement.bind(newDiv));

//const newPar = new DomElement('#best', 60, 700, 'green', 25);
//newPar.createElement();
