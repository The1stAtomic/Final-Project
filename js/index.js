const validUsername = "admin";
const validPassword = "password123";

function validateLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === validUsername && password === validPassword) {
    alert("Login successfully!");
    window.location.href = "home.html";
  }
  else {
    alert("Invalid username or password!");
  }
}