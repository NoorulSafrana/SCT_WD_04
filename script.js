let tasks = [];

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskDate = document.getElementById("task-date");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    title: taskInput.value,
    date: taskDate.value,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";
  taskDate.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className =` task-item ${task.completed ? "completed" : ""}`;

    taskItem.innerHTML = `
      <span class="task-title">${task.title}</span>
      <span class="task-date">${task.date}</span>
      <div class="task-actions">
        <button onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

function toggleComplete(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

function editTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  const newTitle = prompt("Edit Task:", task.title);
  const newDate = prompt("Edit Date and Time:", task.date);

  if (newTitle !== null && newTitle.trim() !== "") {
    task.title = newTitle;
  }
  if (newDate !== null) {
    task.date = newDate;
  }

  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}