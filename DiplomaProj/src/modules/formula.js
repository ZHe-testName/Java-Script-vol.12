const formulaBlockActions = () => {
    const dtFormulaField = document.querySelector('.tablet-hide'),
        formulaItems = dtFormulaField.querySelectorAll('.formula-item__icon-inner-text'),
        formulaItemCards = dtFormulaField.querySelectorAll('.formula-item-popup');
        
    formulaItems.forEach((item) => {
        item.addEventListener('mouseenter', (event) => {
            let target = event.target;
            
            console.dir(navigator.userAgent);
            formulaItemCards.forEach(card => {
                if(card.className.substr(-2) === target.textContent){
                    card.style.visibility = 'visible';
                    card.style.opacity = '1';
                }else if(card.classList.value.substr(-2) === target.textContent){
                    card.style.visibility = 'visible';
                    card.style.opacity = '1';
                }
            });

        });
        
        item.addEventListener('mouseleave', (event) => {
            let target = event.target;
    
            formulaItemCards.forEach(card => {
                if(card.className.substr(-2) === target.textContent){
                    card.style.visibility = 'hidden';
                    card.style.opacity = '0';
                }else if(card.classList.value.substr(-2) === target.textContent){
                    card.style.visibility = 'hidden';
                    card.style.opacity = '0';
                }
            });
        });
    })
};

export default formulaBlockActions;