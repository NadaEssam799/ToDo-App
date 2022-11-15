if (!(localStorage.getItem("user"))) {
  location.href = "../index.html";

}
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#tasks");

document.getElementById("name").innerHTML =
  JSON.parse(localStorage.getItem("user")).first_name +
  " " +
  JSON.parse(localStorage.getItem("user")).last_name;
document.getElementById("profile_picture").src = JSON.parse(
  localStorage.getItem("user")
).avatar;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = input.value;
  if (!task) {
    return;
  }

  const task_div = document.createElement("div");
  task_div.classList.add("task");
  list.appendChild(task_div);

  const task_content_div = document.createElement("div");
  task_content_div.classList.add("content");
  task_div.appendChild(task_content_div);

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.type = "text";
  task_input.value = task;
  task_input.setAttribute("readonly", "readonly");
  task_content_div.appendChild(task_input);

  const task_actions_div = document.createElement("div");
  task_actions_div.classList.add("actions");
  task_div.appendChild(task_actions_div);

  const task_edit_botton = document.createElement("button");
  task_edit_botton.classList.add("Edit");
  task_edit_botton.innerHTML = "Edit";

  const task_delete_button = document.createElement("button");
  task_delete_button.classList.add("Delete");
  task_delete_button.innerHTML = "Delete";

  task_actions_div.appendChild(task_edit_botton);
  task_actions_div.appendChild(task_delete_button);

  task_edit_botton.addEventListener("click", () => {
    if (task_edit_botton.innerText.toLowerCase() == "edit") {
      task_input.removeAttribute("readonly");
      task_input.focus();
      task_edit_botton.innerText = "Save";
    } else {
      task_input.setAttribute("readonly", "readonly");
      task_edit_botton.innerText = "Edit";
    }
  });

  task_delete_button.addEventListener("click", () => {
    list.removeChild(task_div);
  });

  input.value = "";
});

let todos = [];

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((data) => {
    const mytodos = data.filter(
      (todo) => todo.userId === JSON.parse(localStorage.getItem("user")).id
    );
    for (let index = 0; index < mytodos.length; index++) {
      const task_div = document.createElement("div");
      task_div.classList.add("task");
      list.appendChild(task_div);

      const task_content_div = document.createElement("div");
      task_content_div.classList.add("content");
      task_div.appendChild(task_content_div);

      const task_input = document.createElement("input");
      task_input.classList.add("text");
      task_input.type = "text";
      task_input.value = mytodos[index].title;
      task_input.setAttribute("readonly", "readonly");
      task_content_div.appendChild(task_input);

      const task_actions_div = document.createElement("div");
      task_actions_div.classList.add("actions");
      task_div.appendChild(task_actions_div);

      const task_edit_botton = document.createElement("button");
      task_edit_botton.classList.add("Edit");
      task_edit_botton.innerHTML = "Edit";

      const task_delete_button = document.createElement("button");
      task_delete_button.classList.add("Delete");
      task_delete_button.innerHTML = "Delete";

      task_actions_div.appendChild(task_edit_botton);
      task_actions_div.appendChild(task_delete_button);

      task_edit_botton.addEventListener("click", () => {
        if (task_edit_botton.innerText.toLowerCase() == "edit") {
          task_input.removeAttribute("readonly");
          task_input.focus();
          task_edit_botton.innerText = "Save";
        } else {
          task_input.setAttribute("readonly", "readonly");
          task_edit_botton.innerText = "Edit";
        }
      });

      task_delete_button.addEventListener("click", () => {
        list.removeChild(task_div);
      });
    }
  });

document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  location.href = "../index.html";
});
