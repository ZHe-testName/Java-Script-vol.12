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
        toDoCompletedButton.addEventListener('click', function(){
            item.compleated = !item.compleated;
            render();
        })

    })
}

toDoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newToDo = 
    {
        value: headerInput.value,
        compleated: false
    }

    toDoData.push(newToDo);

    render();
});

render();