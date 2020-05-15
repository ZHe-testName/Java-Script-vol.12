const repairPopUpActions = () => {
    const repiarTipesWindow = document.querySelector('.popup-repair-types'),
        allServiceList = document.querySelectorAll('.no-overflow'),
        mainMenu = document.querySelector('.popup-dialog-menu');

    allServiceList.forEach(item => {
        item.addEventListener('click', () => {
            mainMenu.classList.remove('header-menu-descktop-show');
            repiarTipesWindow.style.visibility = 'visible';
        })
    });

    repiarTipesWindow.addEventListener('click', (event) => {
        let target = event.target;

        if(target.classList.contains('mobile-hide')){
            repiarTipesWindow.style = '';
        }
    })
};

export default repairPopUpActions;