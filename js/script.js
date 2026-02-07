let todos = [];

// ADD TODO
function addTodo() {
  const taskInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");

  if (taskInput.value.trim() === "" || dateInput.value === "") {
    alert("Please fill all fields");
    return;
  }

  todos.push({
    task: taskInput.value.trim(),
    date: dateInput.value,
    status: "Pending",
  });

  taskInput.value = "";
  dateInput.value = "";

  renderTodos();

  new bootstrap.Modal(document.getElementById("successModal")).show();
}

// RENDER TODO TABLE
function renderTodos(data = todos) {
  const tbody = document.getElementById("todo-table-body");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-muted text-center">
          No todos available
        </td>
      </tr>
    `;
    return;
  }

  data.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td class="text-start">${item.task}</td>
        <td>${item.date}</td>
        <td>
  <span class="badge ${item.status === "Done" ? "bg-success" : item.status === "Failed" ? "bg-danger" : "bg-warning text-dark"}">
    ${item.status}
  </span>
</td>
        <td>
  <!-- DONE -->
  <button
    class="btn btn-sm btn-success me-1"
    onclick="setStatus(${index}, 'Done')"
    title="Mark as Done"
  >
    <i class="bi bi-check-lg"></i>
  </button>

  <!-- FAILED -->
  <button
    class="btn btn-sm btn-warning me-1"
    onclick="setStatus(${index}, 'Failed')"
    title="Mark as Failed"
  >
    <i class="bi bi-x-circle"></i>
  </button>

  <!-- DELETE -->
  <button
    class="btn btn-sm btn-danger"
    onclick="deleteTodo(${index})"
    title="Delete"
  >
    <i class="bi bi-trash"></i>
  </button>
</td>

      </tr>
    `;
  });
}

// TOGGLE STATUS
function toggleStatus(index) {
  todos[index].status = todos[index].status === "Pending" ? "Done" : "Pending";
  renderTodos();
}

// DELETE SINGLE TODO
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// DELETE ALL TODOS (MODAL)
function deleteAllTodos() {
  todos = [];
  renderTodos();
}

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  deleteAllTodos();
  bootstrap.Modal.getInstance(document.getElementById("deleteConfirmModal")).hide();
});

// FILTER TODOS (MODAL)
function applyFilter() {
  const keyword = document.getElementById("filterInput").value.toLowerCase();

  const filtered = todos.filter((item) => item.task.toLowerCase().includes(keyword));

  renderTodos(filtered);

  bootstrap.Modal.getInstance(document.getElementById("filterModal")).hide();
}

// RESET FILTER
function resetFilter() {
  document.getElementById("filterInput").value = "";
  renderTodos();
}
function setStatus(index, status) {
  todos[index].status = status;
  renderTodos();
}
