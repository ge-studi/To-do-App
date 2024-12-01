const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Import the Todo model
const Todo = require('./models/Todo');

// Use CORS
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true });

// Route to get all tasks (Todos)
app.get('/tasks', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Route to create a new task (Todo)
app.post('/tasks', async (req, res) => {
    const { text } = req.body;
    try {
        const newTodo = new Todo({ text });
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding task' });
    }
});

// Route to delete a task (Todo)
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
