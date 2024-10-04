const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Fetch and display tasks from the backend
async function loadTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task.text}
            <button onclick="removeTask('${task._id}')">Remove</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add a new task
async function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: taskText }),
    });

    const newTask = await response.json();
    loadTasks();  // Reload tasks after adding
    taskInput.value = ''; // Clear the input field
}

// Remove a task
async function removeTask(taskId) {
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
    });
    loadTasks();  // Reload tasks after deleting
}

// Event listener for the add button
addTaskButton.addEventListener('click', addTask);

// Load tasks when the page loads
loadTasks();


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker Registration Failed:', err));
}
document.addEventListener('DOMContentLoaded', loadTasks);