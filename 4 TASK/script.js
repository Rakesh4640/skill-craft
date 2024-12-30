const taskForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

function createTaskElement(taskText, taskTime) {
  const taskElement = document.createElement("li");
  taskElement.classList.add("task");

  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");
  taskDetails.innerHTML = `<span>${taskText}</span><br><span class="task-date">${taskTime}</span>`;
  taskElement.appendChild(taskDetails);

  const taskButtons = document.createElement("div");
  taskButtons.classList.add("task-buttons");

  // Mark Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("complete-btn");
  completeBtn.addEventListener("click", () => {
    taskElement.classList.toggle("completed");
  });

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", () => {
    taskInput.value = taskText;
    taskDate.value = taskTime;
    taskList.removeChild(taskElement);
  });

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskElement);
  });

  taskButtons.appendChild(completeBtn);
  taskButtons.appendChild(editBtn);
  taskButtons.appendChild(deleteBtn);

  taskElement.appendChild(taskButtons);

  return taskElement;
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value;
  const taskTime = taskDate.value;

  if (taskText.trim() && taskTime) {
    const taskElement = createTaskElement(taskText, taskTime);
    taskList.appendChild(taskElement);

    taskInput.value = "";
    taskDate.value = "";
  }
});
