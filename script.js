var input = document.querySelector(".input");
var submit = document.querySelector(".add");
var tasksDiv = document.querySelector(".tasks");

//Array of tasks :

var ArrayOfTasks = [];
// Checking LocalStorage Value
if (localStorage.getItem("tasks")) {
  ArrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLS();
//
function handleSubmit() {
  if (input.value !== "") {
    //execution of a function that adds the task to the array
    addTaskToArray(input.value);
    input.value = "";
  }
}
function addTaskToArray(taskText) {
  // creating of Task Data "creation d'un objet"
  var task = {
    id: Math.random(), // date.now (),
    title: taskText, // taskText=== input.value
    isDone: false,
  };
  //push task to array
  ArrayOfTasks.push(task);
  //create function of adding html
  addElementsToPage(ArrayOfTasks);
  //create a function that adds the array"ArrayOfTasks" to Local Storage
  addDataToLS(ArrayOfTasks);
}
function addElementsToPage(ArrayOfTasks) {
  tasksDiv.innerHTML = " ";
  for (let i = 0; i < ArrayOfTasks.length; i++) {
    //create Div for 1 task
    var div = document.createElement("div");
    div.className = "task-item";
    // class verif completed
    if (ArrayOfTasks[i].isDone === true) {
      div.className = "task-item done";
    }

    div.setAttribute("data-id", ArrayOfTasks[i].id);
    div.appendChild(document.createTextNode(ArrayOfTasks[i].title));
    //Delete Button
    var button = document.createElement("button");
    button.className = "del";
    button.appendChild(document.createTextNode("Delete"));
    div.appendChild(button);
    // add tasks to tasksDiv
    tasksDiv.appendChild(div);
  }
}
function addDataToLS(ArrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(ArrayOfTasks));
}
function getDataFromLS() {
  var data = window.localStorage.getItem("tasks");
  if (data) {
    var tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}
// DELETE
var delete_buttons = document.querySelectorAll(".del");
function deleteTask(e) {
  //Delete LS
  var idClicked = e.target.parentElement.getAttribute("data-id");
  deleteLS(idClicked);
  //Delete HTML
  var Del = e.target.parentElement;
  Del.remove();
}
for (let i = 0; i < delete_buttons.length; i++) {
  delete_buttons[i].addEventListener("click", deleteTask);
}
function deleteLS(idClicked) {
  var filteredTasks = [];
  for (let i = 0; i < ArrayOfTasks.length; i++) {
    if (ArrayOfTasks[i].id != idClicked) {
      filteredTasks.push(ArrayOfTasks[i]);
    }
  }
  ArrayOfTasks = filteredTasks;
  addDataToLS(ArrayOfTasks);
}
//Complete
function changeComp(e) {
  if (e.target.classList.contains("task-item")) {
    e.target.classList.toggle("done");

    var divid = e.target.getAttribute("data-id");
    toggleComp(divid);
  }
}

function toggleComp(divid) {
  for (let i = 0; i < ArrayOfTasks.length; i++) {
    if (ArrayOfTasks[i].id == divid) {
      if (ArrayOfTasks[i].isDone === false) {
        ArrayOfTasks[i].isDone = true;
      } else {
        ArrayOfTasks[i].isDone = false;
      }
    }
  }
  addDataToLS(ArrayOfTasks);
}
tasksDiv.addEventListener("click", changeComp);

function delAll() {
  tasksDiv.innerHTML = " ";
  localStorage.removeItem("tasks");
}
