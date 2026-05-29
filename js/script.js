
const taskInput =
document.getElementById("taskInput");

const categorySelect =
document.getElementById("categorySelect");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.getElementById("taskList");

const filterSelect =
document.getElementById("filterSelect");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", () => {

const taskText =
taskInput.value.trim();

const category =
categorySelect.value;

if(taskText === ""){

alert("Please enter task");

return;

}

const task = {

id: Date.now(),

title: taskText,

category: category,

completed: false

};

tasks.push(task);

saveTasks();

renderTasks();

taskInput.value = "";

});

filterSelect.addEventListener("change", () => {

renderTasks();

});

function renderTasks(){

taskList.innerHTML = "";

const selectedFilter =
filterSelect.value;

let filteredTasks = tasks;

if(selectedFilter !== "All"){

filteredTasks =
tasks.filter(task =>
task.category === selectedFilter);

}

if(filteredTasks.length === 0){

taskList.innerHTML =
"<p class='empty'>No Tasks Found</p>";

updateSummary();

return;

}

filteredTasks.forEach((task) => {

const div =
document.createElement("div");

div.classList.add("task-item");

div.innerHTML = `

<div class="task-content">

<div class="task-title
${task.completed ? "completed" : ""}
">

${task.title}

</div>

<div class="task-category">

${task.category}

</div>

</div>

<div class="task-buttons">

<button onclick="toggleTask(${task.id})">

${task.completed ? "Undo" : "Complete"}

</button>

<button onclick="editTask(${task.id})">

Edit

</button>

<button onclick="deleteTask(${task.id})">

Delete

</button>

</div>

`;

taskList.appendChild(div);

});

updateSummary();

}

function editTask(id){

const task =
tasks.find(task =>
task.id === id);

const updatedTitle =
prompt(
"Edit Task",
task.title
);

if(
updatedTitle === null ||
updatedTitle.trim() === ""
){

return;

}

task.title =
updatedTitle.trim();

saveTasks();

renderTasks();

}

function deleteTask(id){

tasks =
tasks.filter((task) =>
task.id !== id);

saveTasks();

renderTasks();

}

function toggleTask(id){

tasks =
tasks.map((task) => {

if(task.id === id){

task.completed =
!task.completed;

}

return task;

});

saveTasks();

renderTasks();

}

function saveTasks(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}

function updateSummary(){

const total =
tasks.length;

const completed =
tasks.filter(task =>
task.completed).length;

const pending =
total - completed;

const cards =
document.querySelectorAll(".card p");

cards[0].innerText = total;
cards[1].innerText = completed;
cards[2].innerText = pending;

}