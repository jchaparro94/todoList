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
  // Add To do event 
  form.addEventListener('submit', addTodo);
}

// Add To Do 
function addTodo(e) {
  if (todoInput.value === '') {
    alert('add an item');
  }

  // Create li element 
  const li = document.createElement('li');
  // Add Class 
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
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

  // Clear input 
  todoInput.value = '';

  e.preventDefault();
}