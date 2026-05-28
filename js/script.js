const taskInput =
document.getElementById("taskInput");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.getElementById("taskList");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", () => {

const taskText =
taskInput.value.trim();

if(taskText === ""){

alert("Please enter task");

return;

}

const task = {

id: Date.now(),

title: taskText,

completed: false

};

tasks.push(task);

saveTasks();

renderTasks();

taskInput.value = "";

});

function renderTasks(){

taskList.innerHTML = "";

if(tasks.length === 0){

taskList.innerHTML =
"<p class='empty'>No Tasks Added</p>";

updateSummary();

return;

}

tasks.forEach((task) => {

const div =
document.createElement("div");

div.classList.add("task-item");

div.innerHTML = `

<div class="task-content">

<span>

${task.title}

</span>

</div>

<div class="task-buttons">

<button onclick="toggleTask(${task.id})">

${task.completed ? "Undo" : "Complete"}

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