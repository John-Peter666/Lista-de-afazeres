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
}
inputBox.value = '';
} 

addTaskBtn.addEventListener('click', addTask);