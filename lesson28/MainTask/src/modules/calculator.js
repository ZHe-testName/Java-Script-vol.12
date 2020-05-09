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
                num += 100;
            }else if(finishRez < num){
                clearInterval(intervalIndex);
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
            totalAnimate(total);
        }
console.log(total);
        totalValue.textContent = total;
    };

    calcBlock.addEventListener('input', (event) => {
        let target = event.target;
        console.dir(target);
        if(target.tagName.toLowerCase() === 'select' || target.tagName.toLowerCase() === 'input'){
            console.log('hi');
            countSum();
        }
    });
};

export default calculator;