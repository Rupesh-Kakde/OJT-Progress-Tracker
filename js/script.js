
const taskInput =
document.getElementById("taskInput");

const categorySelect =
document.getElementById("categorySelect");

const addTaskBtn =
document.getElementById("addTaskBtn");

const exportBtn =
document.getElementById("exportBtn");

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


exportBtn.addEventListener("click", exportCSV);


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

cards[0].innerText =
total;

cards[1].innerText =
completed;

cards[2].innerText =
pending;

updateProgressChart(
total,
completed,
pending
);

}


function updateProgressChart(
total,
completed,
pending
){

let completedPercent = 0;

let pendingPercent = 0;

if(total > 0){

completedPercent =
Math.round(
(completed / total) * 100
);

pendingPercent =
Math.round(
(pending / total) * 100
);

}

document.getElementById(
"completedBar"
).style.width =
completedPercent + "%";

document.getElementById(
"pendingBar"
).style.width =
pendingPercent + "%";

document.getElementById(
"completedPercent"
).innerText =
completedPercent + "%";

document.getElementById(
"pendingPercent"
).innerText =
pendingPercent + "%";

}


function exportCSV(){

if(tasks.length === 0){

alert(
"No tasks available to export"
);

return;

}

let csvContent =
"Task Title,Category,Status\n";

tasks.forEach(task => {

const status =
task.completed
? "Completed"
: "Pending";

csvContent +=
`${task.title},${task.category},${status}\n`;

});

const blob =
new Blob(
[csvContent],
{ type: "text/csv" }
);

const url =
window.URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download =
"ojt-progress-report.csv";

document.body.appendChild(a);

a.click();

document.body.removeChild(a);

window.URL.revokeObjectURL(url);

}

