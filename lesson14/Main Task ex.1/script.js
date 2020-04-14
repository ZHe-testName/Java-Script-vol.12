'use strict';

const DomElement = function(selector, height, width, bgCol, fonSize){
    this.selector = selector;
    this.height = height + 'px';
    this.width = width + 'px';
    this.bgCol = bgCol;
    this.fonSize = fonSize + 'px';

    this.createElement = function(){
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
                                height: ${this.height};
                                width: ${this.width};
                                background-color: ${this.bgCol};
                                font-size: ${this.fonSize};
                                `
        document.body.append(element);
    };
};

const newDiv = new DomElement('.block', 100, 300, 'red', 35);
const newPar = new DomElement('#best', 60, 700, 'green', 25);

newDiv.createElement();
newPar.createElement();
