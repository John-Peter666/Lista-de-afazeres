const inputBox = document.getElementById('input-box');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');


function addTask() {
    if (inputBox.value === ''){ 
    alert('Por favor, insira uma tarefa.');

} else{
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    taskList.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
}
inputBox.value = '';
saveTasks();
} 

addTaskBtn.addEventListener('click', addTask);

taskList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveTasks();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveTasks();
    }
}, false);

// Adiciona a funcionalidade de pressionar "Enter" para adicionar a tarefa
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function saveTasks() {
    localStorage.setItem('data', taskList.innerHTML);

}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem('data');
}

loadTasks();