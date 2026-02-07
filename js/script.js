// Temporary storage for todo items
let todos = [];

// Function to add a new todo item
function addTodo() {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");

  // Validasi
  if (todoInput.value.trim() === "" || todoDate.value === "") {
    alert("Please enter both a todo item and a due date.");
    return;
  }

  // Create todo object
  const newTodo = {
    todo: todoInput.value.trim(),
    date: todoDate.value,
  };

  // Push ke array
  todos.push(newTodo);

  // Reset input
  todoInput.value = "";
  todoDate.value = "";

  // Render ulang list
  renderTodos();

  // Tampilkan modal sukses
  const successModal = new bootstrap.Modal(document.getElementById("successModal"));
  successModal.show();
}

// Render todo list
function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = `
      <li class="list-group-item text-muted text-center">
        No todos available
      </li>
    `;
    return;
  }

  todos.forEach((item) => {
    todoList.innerHTML += `
      <li class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-semibold">
            ${item.todo}
            <small class="text-muted">(${item.date})</small>
          </span>
        </div>
      </li>
    `;
  });
}

// Delete all todos
function deleteAllTodos() {
  todos = [];
  renderTodos();
}

// Search filter
function applyFilter() {
  const keyword = document.getElementById("filterInput").value.toLowerCase();

  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((item) => item.todo.toLowerCase().includes(keyword));

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `
      <li class="list-group-item text-muted text-center">
        Todo tidak ditemukan
      </li>
    `;
  } else {
    filteredTodos.forEach((item) => {
      todoList.innerHTML += `
        <li class="list-group-item">
          <strong>${item.todo}</strong>
          <small class="text-muted">(${item.date})</small>
        </li>
      `;
    });
  }

  // Tutup modal
  bootstrap.Modal.getInstance(document.getElementById("filterModal")).hide();
}
// reset filter
function resetFilter() {
  document.getElementById("filterInput").value = "";
  renderTodos();

  bootstrap.Modal.getInstance(document.getElementById("filterModal")).hide();
}

// Konfirmasi hapus (modal)
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  deleteAllTodos();
  bootstrap.Modal.getInstance(document.getElementById("deleteConfirmModal")).hide();
});
