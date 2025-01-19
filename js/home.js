function activeDashboard() {
  const links = document.querySelectorAll(".sidebar-links li a");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(link => link.classList.remove("active"));
    link.classList.add("active");
  });
});
}

activeDashboard()

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";

    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

document.getElementById('projects').addEventListener('change', function() {
  const sortOrder = this.value;
  sortTasks(sortOrder);
});

let sortTasks = (order) => {
  // Sort the data array based on the selected option
  if (order === 'recent') {
    // Sort by most recent (newest first)
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (order === 'oldest') {
    // Sort by oldest first
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  createTasks();
};

let categoryColors = ['category_color1', 'category_color2', 'category_color3', 'category_color4'];

let createTasks = () => {
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = "";

  data.map((x, y) => {
    let randomColorClass = categoryColors[Math.floor(Math.random() * categoryColors.length)];

    let descriptionList = x.description.split(',').map(item => `<li>${item}</li>`).join('');

    return (tasksContainer.innerHTML += `
      <div class="project-list">
        <div class="project" id=${y}>
          <div class="category ${randomColorClass}"></div>
          <h2>${x.text}</h2>
          <p>${x.date}</p>

          <ul class="activity">
            ${descriptionList}
          </ul>

          <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
      </div>
    `);
  });

  resetForm();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();

  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();