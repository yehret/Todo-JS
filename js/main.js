const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

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
  const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
                      <span class="task-title">${taskValue}</span>
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

  // Clean taskInput
  taskInput.value = "";
  taskInput.focus(); // Focus the input

  // Adding none class to emptyList
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function deleteTask (e) {
  if (event.target.dataset.action === 'delete'){
    event.target.closest('li').remove()
  }

  if (tasksList.children.length == 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask (e) {
  if (event.target.dataset.action === 'done'){
    event.target.closest('.list-group-item').querySelector('.task-title').classList.toggle('task-title--done')
  }
}




