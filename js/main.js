const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem(`tasks`)) {
  tasks = JSON.parse(localStorage.getItem(`tasks`))
  tasks.forEach((task) => renderTask(task))
}

checkEmptyList();

// addTask
form.addEventListener("submit", addTask);
// delTask
tasksList.addEventListener('click', deleteTask)
// doneTask
tasksList.addEventListener('click', doneTask)


// Functions
function addTask (e) {
  // Cancel page reloading
  e.preventDefault();

  // Gettings text from input
  const taskValue = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskValue,
    done: false
  }

  tasks.push(newTask);
  SaveToLocalStorage()

  renderTask(task)

  // Clean taskInput
  taskInput.value = "";
  taskInput.focus(); // Focus the input

  // Adding none class to emptyList
  // if (tasksList.children.length > 1) emptyList.classList.add("none");
  checkEmptyList()
}

function deleteTask (e) {
  if (event.target.dataset.action !== 'delete') return

  const id = Number(event.target.closest('li').id)
  // const index = tasks.findIndex((task) => task.id = id) // =  return task id === id
  // tasks.splice(index, 1)

  // Delete array element by filter
  tasks = tasks.filter((task) => task.id !== id)
  SaveToLocalStorage()
  event.target.closest('li').remove()

  // if (tasksList.children.length === 1) emptyList.classList.remove("none");
  checkEmptyList()


}

function doneTask (e) {
  if (event.target.dataset.action !== 'done') return

  const id = event.target.closest('li').id
  const task = tasks.find((task) => task.id == id)
  task.done = !task.done

  event.target.closest('.list-group-item').querySelector('.task-title').classList.toggle('task-title--done')
  SaveToLocalStorage()
}

function checkEmptyList() {
  if(tasks.length === 0) {
    const emptyListHTML = ` <li id="emptyList" class="list-group-item empty-list">
                            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                            <div class="empty-list__title">List of tasks is empty</div>
                          </li>`

    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null
  }
}

function SaveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";
  
  const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                      <span class=${cssClass}>${newTask.text}</span>
                      <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                          <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                          <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                      </div>
                    </li>`;

  // Put HTML code into the list of tasks
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}