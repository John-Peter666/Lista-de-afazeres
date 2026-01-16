const inputBox = document.getElementById('input-box');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const botoes = document.querySelectorAll('#btn-foco button');

/* =========================
   CONTAGENS (FOCO)
========================= */

// carrega contagens salvas
function carregarContagens() {
  const dados = localStorage.getItem('contagens');
  if (!dados) return;

  const contagens = JSON.parse(dados);

  document.getElementById('focado').innerText = contagens.focado || 0;
  document.getElementById('descansando').innerText = contagens.descansando || 0;
  document.getElementById('distraido').innerText = contagens.distraido || 0;
}

// salva contagens
function salvarContagens() {
  const contagens = {
    focado: document.getElementById('focado').innerText,
    descansando: document.getElementById('descansando').innerText,
    distraido: document.getElementById('distraido').innerText
  };

  localStorage.setItem('contagens', JSON.stringify(contagens));
}

// clique dos botões
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const tipo = botao.dataset.tipo;
    const span = document.getElementById(tipo);

    let valor = Number(span.innerText) || 0;
    span.innerText = valor + 1;

    salvarContagens();
  });
});

// botão de reset
document.getElementById('reset-contagens').addEventListener('click', () => {
  document.getElementById('focado').innerText = 0;
  document.getElementById('descansando').innerText = 0;
  document.getElementById('distraido').innerText = 0;

  localStorage.removeItem('contagens');
});

/* =========================
   TODO LIST
========================= */

function addTask() {
  if (inputBox.value === '') {
    alert('Por favor, insira uma tarefa.');
  } else {
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

taskList.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveTasks();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveTasks();
  }
}, false);

inputBox.addEventListener('keypress', function (e) {
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

// inicialização
loadTasks();
carregarContagens();
