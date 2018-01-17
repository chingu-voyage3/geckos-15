document.addEventListener("DOMContentLoaded", showTodos());

	//when addtodo button is clicked
document.getElementById("add").addEventListener("click", addTodo);

function removeTodo(e){
	console.log(e);
	let todos =[];
	const todoList = localStorage.getItem("todos");
	todos = [todoList];
	todos.filter(e , 1);
	localStorage.setItem("todos", todos);
	console.log("updated storage");
	showTodos();
}

function showTodos() {
  let todoList = localStorage.getItem("todos").split(",");

  document.getElementById("todos").innerHTML = "";

  if (todoList) {
    for (let i = 0; i < todoList.length; i++) {
      document.getElementById("todos").innerHTML += `<li>${
        todoList[i]
      }<i onclick="removeTodo(${i})" class="fa fa-times pull-right"></i><i onclick="doneTodos(${i})" class="fa fa-check pull-right"></i></li>`;
    }
  } else {
    document.getElementById("todos").innerHTML += "<p>Let's Do Stuff!</p>";
  }
}

function addTodo(e) {
  e.preventDefault();
  let description = document.getElementById("description").value.trim();
  let todos = [];

  //check to see if they wrote something
  if (description.length < 1) {
    console.log(description);
    console.log("Input too short");
    document.getElementById("alert").innerHTML = "Ooops! forgot something";
    return;
  }

  // Check if there is local storage item named todos
  if (localStorage.getItem("todos")) {
    const todoList = localStorage.getItem("todos");
    // If input have good value store that value as todo
    todos = [todoList];
    todos.push(description);
    localStorage.setItem("todos", todos);
    console.log("Set to storage");
  } else {
    // if not create new todos in local storage
    todos.push(description);
    localStorage.setItem("todos", todos);
  }

  // Clear description input value
  document.getElementById("description").value = "";
  //reset form button value and call display function to show todo list below
  document.getElementById("add").value = "Add Another Todo";
  showTodos();
}
