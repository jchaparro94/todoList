// Define UI Variables
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-list');
const filter = document.querySelector('#filter');
const todoInput = document.querySelector('#todo');

// Load all event listeners 
loadEventListeners();

// Load all event listeners 
function loadEventListeners() {
  // DOM LOAD Event 
  document.addEventListener('DOMContentLoaded', getToDos);
  // Add To do event 
  form.addEventListener('submit', addTodo);
  // Remove todo event 
  todoList.addEventListener('click', removeToDo);
  // Clear list event 
  clearBtn.addEventListener('click', clearToDoList);
  // Filter To do list event 
  filter.addEventListener('keyup', filterList);
}

// Get to do list from LS to display
function getToDos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    // Create li element 
    const li = document.createElement('li');
    // Add Class 
    li.className = 'list-group-item';
    // Create textnode and append to the li 
    li.appendChild(document.createTextNode(todo));
    // Create new link element 
    const link = document.createElement('a');
    // Add class 
    link.className = 'delete-item'
    // Add icon html 
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to the li 
    li.appendChild(link);

    // Append the li to the ul 
    todoList.appendChild(li);

  });
}

// Add To Do 
function addTodo(e) {
  if (todoInput.value === '') {
    alert('add an item');
  }

  // Create li element 
  const li = document.createElement('li');
  // Add Class 
  li.className = 'list-group-item';
  // Create textnode and append to the li 
  li.appendChild(document.createTextNode(todoInput.value));
  // Create new link element 
  const link = document.createElement('a');
  // Add class 
  link.className = 'delete-item'
  // Add icon html 
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append the link to the li 
  li.appendChild(link);

  // Append the li to the ul 
  todoList.appendChild(li);

  // Store in LS 
  storeInLocalStorage(todoInput.value);

  // Clear input 
  todoInput.value = '';

  e.preventDefault();
}

// store in LS 
function storeInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove To Do 
function removeToDo(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    console.log(e.target);
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS 
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS 
function removeFromLocalStorage(todoItem) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo, index) {
    if (todoItem.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear To Do List 
function clearToDoList() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Clear from LS 
  clearListFromLocalStorage();
}

// Clear LS 
function clearListFromLocalStorage() {
  localStorage.clear();
}

// Filter List 
function filterList(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(function (todo) {
    const item = todo.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      todo.style.display = 'flex';
    } else {
      todo.style.display = 'none';
    }
  });
}