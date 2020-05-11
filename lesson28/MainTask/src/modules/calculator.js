const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    const totalAnimate = (finishRez) => {
        let num = 0;
        let intervalIndex = setInterval(() => {
            if(finishRez >= num){
                totalValue.textContent = num;
                num += 200;
            }else if(finishRez < num){
                clearInterval(intervalIndex);

                for(let i = 1; i < 9; i += 2){
                    calcBlock.childNodes[i].removeAttribute('readonly');
                }
            }
        }, 10);
    };

    const countSum = () => {
        let total = 0,
            countValue =  1,
            dayValue = 1;
        
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if(calcCount.value > 1){
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value < 5){
            dayValue *= 2;
        }else if(calcDay.value && calcDay.value < 10){
            dayValue *= 1.5;
        }
        
        if(typeValue && squareValue){
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);

            for(let i = 1; i < 9; i += 2){
                calcBlock.childNodes[i].setAttribute('readonly', 'true');
            }

            totalAnimate(total);
        }

        totalValue.textContent = total;
    };

    calcBlock.addEventListener('input', (event) => {
        let target = event.target;
        
        if(target.tagName.toLowerCase() === 'select' || target.tagName.toLowerCase() === 'input'){
            countSum();
        }
    });
};

export default calculator;