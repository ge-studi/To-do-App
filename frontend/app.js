//Selecting the input fields, add button, and task list
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

//Function to add a task
const defineTask = (taskDescription) => {
    //Create new list item
    const li = document.createElement('li');
    li.textContent = taskDescription;

    //Create a delete button for the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';

    //Attach event listener to the delete button
    deleteButton.addEventListener('click',() => {
      taskList.removeChild(li); //remove the task from the list
    });

    //Append the delete button to the list item
    li.appendChild(deleteButton);

    //Add the list item to the task list
    taskList.appendChild(li);
};

// Fetch all tasks from the backend
const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks'); // Change this to your backend URL
        const tasks = await response.json();
        tasks.forEach(task => defineTask(task)); // Render each task
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Add a task to the backend
const addTask = async (taskDescription) => {
    try {
        const response = await fetch('http://localhost:3000/tasks', { // Replace with your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: taskDescription }),
        });

        const task = await response.json();
        defineTask(task);  // Display the new task in the UI
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

// Delete a task from the backend
const deleteTask = async (taskId) => {
    try {
        await fetch(`http://localhost:3000/tasks/${taskId}`, {  // Replace with your backend URL
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};


//Event listener for the "Add Task" button
addTaskButton.addEventListener('click',() => {
    const taskDescription = taskInput.value.trim();

    if(taskDescription){
        defineTask(taskDescription);
        taskInput.value = '';//Clear the input field
    }

    else{
        alert('Please enter a task description');
    }
});

