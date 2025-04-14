const input = document.querySelector('.input');
const addBtn = document.querySelector('.add-button');
const list = document.querySelector('.lists');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;

renderTasks();

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = 'list-row';

    li.innerHTML = `
      <button class="${task.checked ? 'checked' : 'unchecked'}">
        <ion-icon name="${task.checked ? 'checkmark-circle-outline' : 'ellipse-outline'}"></ion-icon>
      </button>
      <span class="${task.checked ? 'checked' : ''}">${task.text}</span>
      <button class="edit-button"><ion-icon name="create"></ion-icon></button>
      <button class="delete-button"><ion-icon name="trash"></ion-icon></button>
    `;

    // Toggle check/uncheck
    li.children[0].onclick = () => {
      tasks[i].checked = !tasks[i].checked;
      save(); renderTasks();
    };

    // Edit button — load into input
    li.children[2].onclick = () => {
      input.value = task.text;
      editIndex = i;
      input.focus();
    };

    // Delete
    li.children[3].onclick = () => {
      tasks.splice(i, 1);
      save(); renderTasks();
    };

    list.appendChild(li);
  });
}

// Add or Save edited
addBtn.onclick = () => {
  let text = input.value.trim();

  // Just alert if input is empty
  if (!text) {
    alert("Please enter a task!");
    return;
  }

  if (editIndex !== null) {
    tasks[editIndex].text = text;
    editIndex = null;
  } else {
    tasks.push({ text, checked: false });
  }

  input.value = '';
  save(); renderTasks();
};
