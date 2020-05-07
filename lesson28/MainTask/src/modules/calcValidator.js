const calcValidator = () => {
    const calcInputs = document.querySelectorAll('input.calc-item');
    
    calcInputs.forEach((calcImp) => {
        calcImp.addEventListener('input', () => {
            calcImp.value = calcImp.value.replace(/\D/, '');
        })
    })
};

export default calcValidator;