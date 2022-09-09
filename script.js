// fetching from html
const todoInput = document.getElementById("todoInput");
const todoUl = document.getElementById("todoUl");
const submitBtn = document.getElementById("submitBtn");
let list = [];

const listFromStorage = JSON.parse(localStorage.getItem("list"));
// localStorage.clear()

if (listFromStorage) {
  list = listFromStorage;
  render(list);
}

// fetching modal elements from html
const deleteModalTrigger = document.getElementById("deleteModalTrigger");
const doneModalTrigger = document.getElementById("doneModalTrigger");
const delModalBox = document.getElementById("delModalBox");
const doneModalBox = document.getElementById("doneModalBox");
let del = document.getElementById("delete");
const noDel = document.getElementById("noDelete");
const done = document.getElementById("done");

// display task
function render(arr) {
  listItems = "";
  for (let i = 0; i < arr.length; i++) {
    listItems += `
    <li id="task">
    <p id="taskText">${arr[i]}</p>
    <div class="listButtons">
      <span id="deleteModalTrigger">&#9746;</span>
      <span id="doneModalTrigger">&#9745;</span>
    </div>
  </li>
    `;
  }
  todoUl.innerHTML = listItems;
}

submitBtn.addEventListener("click", function () {
  if (todoInput.value != "") {
    list.push(todoInput.value);
    todoInput.value = "";
  }
  localStorage.setItem("list", JSON.stringify(list));
  render(list);
});

// popup window code
deleteModalTrigger.addEventListener("click", function () {
  delModalBox.style.display = "block";
});

doneModalTrigger.addEventListener("click", function () {
  doneModalBox.style.display = "block";
});

del.addEventListener("click", function () {
  const delTask = list.splice(0, 1);
  if (delTask) {
    delModalBox.style.display = "none";
  }
  localStorage.setItem("list", JSON.stringify(list));
  render(list);
});

noDel.addEventListener("click", function () {
  delModalBox.style.display = "none";
});

done.addEventListener("click", function () {
  const doneTask = list.splice(0, 1);
  if (doneTask) {
    doneModalBox.style.display = "none";
  }
  localStorage.setItem("list", JSON.stringify(list));
  render(list);
})

// window.addEventListener("click", function (event) {
//   if (event.target == delModalBox || event.target == doneModalBox) {
//     delModalBox.style.display = "none";
//     doneModalBox.style.display = "none";
//   }
// });
