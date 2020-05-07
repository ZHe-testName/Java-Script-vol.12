const changeImg = () => {
    const commandSection = document.getElementById('command');

    let src;

    commandSection.addEventListener('mouseover', (event) => {
        let target = event.target;

        src = target.src;

        if(target.matches('.command__photo')){
            target.src = target.dataset.img;
        }
    });

    commandSection.addEventListener('mouseout', (event) => {
        let target = event.target;

        if(target.matches('.command__photo')){
            target.src = src;
        }
    });
};

export default changeImg;