const inputBox = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoUl");
const submitBtn = document.querySelector("#submitBtn");
const errorMessage = document.querySelector(".errorMessage");

// Fetching modal elements from HTML
const delModalBox = document.getElementById("delModalBox");
const doneModalBox = document.getElementById("doneModalBox");
const del = document.getElementById("delete");
const noDel = document.getElementById("noDelete");
const done = document.getElementById("done");

// Variable to keep track of the selected task
let selectedTask = null;

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = [];
  const taskItems = document.querySelectorAll("#todoUl li");

  taskItems.forEach((taskItem) => {
    tasks.unshift(taskItem.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks && storedTasks.length > 0) {
    storedTasks.forEach((taskText) => {
      const task = createTaskElement(taskText);
      todoList.prepend(task);
    });
  }
}

// Function to create a task element
function createTaskElement(taskText) {
  const task = document.createElement("li");
  task.setAttribute("id", "task");
  const taskTextElement = document.createElement("p");
  taskTextElement.setAttribute("id", "taskText");
  taskTextElement.textContent = taskText.replace("☑", ""); // Remove the symbol from the task text

  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = "&#9745;";
  deleteButton.classList.add("listButtons");
  deleteButton.addEventListener("click", function () {
    // Set the selected task when the delete button is clicked
    selectedTask = task;
    delModalBox.style.display = "block";
  });

  task.appendChild(taskTextElement);
  task.appendChild(deleteButton);

  return task;
}

// Load tasks from local storage when the page loads
loadTasksFromLocalStorage();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const taskName = inputBox.value.trim();

  if (taskName === "") {
    errorMessage.textContent = "Please enter a task name.";
  } else {
    errorMessage.textContent = "";

    const task = createTaskElement(taskName);
    todoList.prepend(task);

    // Save tasks to local storage when a new task is added
    saveTasksToLocalStorage();

    inputBox.value = "";
  }
});

del.addEventListener("click", () => {
  if (selectedTask) {
    selectedTask.remove();

    // Save tasks to local storage after a task is deleted
    saveTasksToLocalStorage();
  }

  delModalBox.style.display = "none";
  selectedTask = null; // Reset selected task
});

noDel.addEventListener("click", function () {
  delModalBox.style.display = "none";
  selectedTask = null; // Reset selected task
});

done.addEventListener("click", function () {
  // You can add code here to handle marking a task as done
  doneModalBox.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == delModalBox || event.target == doneModalBox) {
    delModalBox.style.display = "none";
    doneModalBox.style.display = "none";
  }
});
