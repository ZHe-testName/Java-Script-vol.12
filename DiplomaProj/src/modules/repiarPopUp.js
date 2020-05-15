const repairPopUpActions = () => {
    const repiarTipesWindow = document.querySelector('.popup-repair-types'),
        allServiceList = document.querySelectorAll('.no-overflow'),
        mainMenu = document.querySelector('.popup-dialog-menu'),
        mobileRepairTypesWindow = document.querySelector('.popup-repair-types');

    allServiceList.forEach(item => {
        item.addEventListener('click', () => {
            mainMenu.classList.remove('header-menu-descktop-show');
            mainMenu.classList.remove('header-menu-mobile-show');
            repiarTipesWindow.style.visibility = 'visible';
        })
    });

    repiarTipesWindow.addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('mobile-hide')){
            repiarTipesWindow.style.visibility = 'hidden';
        }
    });

    mobileRepairTypesWindow.addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('close')){
            mobileRepairTypesWindow.style.visibility = 'hidden';
        }
    })
};

export default repairPopUpActions;