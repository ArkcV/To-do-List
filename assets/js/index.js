// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funcaoz
 const saveTodo = (text, done = 0, save = 1) => {

  // Template
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  todo.appendChild(todoTitle); 
  //console.log(todo);

  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish-todo');
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);
  
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-todo');
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('remove-todo');
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

   // Utilizando dados da localStorage
   if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodosLocalStorage({ text, done: 0 });
  }

  todoList.appendChild(todo);
  todoInput.focus();

 };

 const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
 };

 const updateTodo = (text) => { // editInputValue

   const todos = document.querySelectorAll('.todo');
   todos.forEach((todo) => {

    let todoTitle = todo.querySelector('h3');

    if(todoTitle.innerText === oldInputValue) { // encontrando o todo certo
      todoTitle.innerText = text; // alterando o texto
    }

   });
 };


// Eventos
todoForm.addEventListener("submit", e => {
  e.preventDefault();

  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue)
  //console.log(inputValue);
  }
});

// Indentificando Botoes
document.addEventListener('click', e => {
  const targetEl = e.target
  const parentEl = targetEl.closest('div');
  let todoTitle;

  if(parentEl && parentEl.querySelector('h3')) {
    todoTitle = parentEl.querySelector('h3').innerText;
  }

  if(targetEl.classList.contains('finish-todo')) {
    parentEl.classList.toggle('done');
    //console.log('done');
    updateTodoStatusLocalStorage(todoTitle);
  };

  if(targetEl.classList.contains('edit-todo')) {
    toggleForms();
    
    editInput.value = todoTitle; // editando
    oldInputValue = todoTitle;  // salvando
    //console.log('edit')
  };

  if(targetEl.classList.contains('remove-todo')) {
    parentEl.remove()
    //console.log('remove')

    // Utilizando dados da localStorage
     removeTodosLocalStorage(todoTitle);
  };
});


editForm.addEventListener('submit', e => {
  e.preventDefault();

  const editInputValue = editInput.value


  if(editInputValue) {
    updateTodo(editInputValue)
  }

  toggleForms();

});



//LocalStorage

//recebendo
const getTodosLocalStorage = () => {
 const todos = JSON.parse(localStorage.getItem("todos")) || [];
 return todos;
};


//enviando
const saveTodosLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();
 
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};


// carregando localstorage
const loadTodos = () => {
  const todos = getTodosLocalStorage();
  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};


// enviado removidos
const removeTodosLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filterTodos = todos.filter((todo) => todo.text != todoText )

  localStorage.setItem("todos", JSON.stringify(filterTodos));
};


const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};


const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};


loadTodos();
