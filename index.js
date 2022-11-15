//get users
let users = [];
function getUsers(api) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      users = users.concat(data.data);
    });
}
getUsers("https://reqres.in/api/users");
getUsers("https://reqres.in/api/users?page=2");

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const user = users.find((user) => user.email === email);
  if (user == undefined) {
    Swal.fire(
      'Error!',
      'Wrong email!',
      'error'
    )
  } else {
    localStorage.setItem("user", JSON.stringify(user));
    location.href="todos/index.html"
  }
});


