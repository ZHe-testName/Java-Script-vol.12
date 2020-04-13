'use strict';

const headerInput = document.querySelector('.header-input'),
    toDoControl = document.querySelector('.todo-control'),
    toDoList = document.querySelector('.todo-list'),
    toDoCompleted = document.querySelector('.todo-completed');

const toDoData = [
    {
        value: 'Сварить кофе',
        compleated: false,
    },

    {
        value: 'Помыть посуду',
        compleated: true,
    },
];

function render(){
    toDoList.textContent = '';
    toDoCompleted.textContent = '';
    headerInput.value = '';

    toDoData.forEach(function(item){
        let li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.value}</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`;

        (item.compleated) ? toDoCompleted.append(li) : toDoList.append(li);

        let toDoCompletedButton = li.querySelector('.todo-complete');
        let todoRemoveButton = li.querySelector('.todo-remove');

        toDoCompletedButton.addEventListener('click', function(){
            item.compleated = !item.compleated;
            render();
        });

        todoRemoveButton.addEventListener('click', function(){
            let index = toDoData.indexOf(item);
            toDoData.splice(index,1);
            render();
        })
        
    })
}

toDoControl.addEventListener('submit', function(event){
    event.preventDefault();
    let newToDo = {};
    //Почему если убрать круглые скобки то условие всегда ложное if(!headerInput.value === '') === false ???
    //а со скобками работает...
    if(!(headerInput.value === '')){
            newToDo.value = headerInput.value;
            newToDo.compleated = false;

            toDoData.push(newToDo);
            console.log(newToDo);
            render();
    }
});

render();