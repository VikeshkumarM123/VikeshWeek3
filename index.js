function Task(title, description, dueDate, priority) { this.title = title;
    this.description = description; this.dueDate = dueDate; this.priority = priority; this.completed = false;
    }
    let taskList = [];
    function addTask(task) { taskList.push(task); displayTasks();
    }
    function deleteTask(taskId) { taskList.splice(taskId, 1); displayTasks();}
    function updateTask(taskId, updatedTask) { taskList[taskId] = updatedTask; displayTasks();
    }
    function toggleTaskCompletion(taskId) { taskList[taskId].completed = !taskList[taskId].completed; displayTasks();
    }
    const taskListContainer = document.getElementById("task-list");
    function displayTasks() { taskListContainer.innerHTML = ''; taskList.forEach((task, index) => {
    const taskItem = document.createElement("li"); taskItem.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskCompletion(${index})">
    ${task.title} (Due: ${task.dueDate}, Priority: ${task.priority})
    <button onclick="deleteTask(${index})">Delete</button>`;
    taskListContainer.appendChild(taskItem);});} 
    const taskTitleInput = document.getElementById("task-title"); 
    const taskDescriptionInput = document.getElementById("task-description"); const taskDueDateInput = document.getElementById("task-dueDate"); const taskPriorityInput = document.getElementById("task-priority");
    const addTaskButton = document.getElementById("add-task");
    addTaskButton.addEventListener("click", () => { const title = taskTitleInput.value;
    const description = taskDescriptionInput.value; const dueDate = taskDueDateInput.value; const priority = taskPriorityInput.value;
    const task = new Task(title, description, dueDate, priority); addTask(task);
    taskTitleInput.value = ''; taskDescriptionInput.value = ''; taskDueDateInput.value = ''; taskPriorityInput.value = 'low';
    });
    function saveTasksToLocalStorage() { localStorage.setItem("taskList", JSON.stringify(taskList));
    function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem("taskList"); if (savedTasks) {
    taskList = JSON.parse(savedTasks); displayTasks();
    }
    } 
    window.addEventListener("beforeunload", saveTasksToLocalStorage); window.addEventListener("load", loadTasksFromLocalStorage);
    try {
    } catch (error) {
    console.error("An error occurred:", error.message);
    }
    displayTasks();
}
