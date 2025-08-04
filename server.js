const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Load tasks from file or initialize with an empty array
const loadTasks = () => {
    if (fs.existsSync(TASKS_FILE)) {
        const data = fs.readFileSync(TASKS_FILE);
        return JSON.parse(data);
    }
    return [];
};

let tasks = loadTasks();

// Save tasks to the file
const saveTasks = () => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// --- API Endpoints ---

// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: Date.now(), // Use a timestamp as a unique ID
        text: req.body.text,
        priority: req.body.priority,
        isDone: false
    };
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
});

// PUT to update a task (e.g., mark as done)
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        saveTasks();
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).send('Task not found');
    }
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    res.status(204).send();
});

// DELETE all tasks
app.delete('/api/tasks', (req, res) => {
    tasks = [];
    saveTasks();
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});