document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskList = document.getElementById('task-list');
    const totalTasksSpan = document.getElementById('total-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');
    const performanceRateSpan = document.getElementById('performance-rate');
    const clearTasksBtn = document.getElementById('clear-tasks-btn');

    const API_URL = '/api/tasks';

    // A simple lookup table for task suggestions
    const taskSuggestions = {
        'math': ['Review key formulas.', 'Do 5 practice problems from your textbook.', 'Watch a video tutorial on a tricky topic.', 'Create a cheat sheet of concepts.'],
        'science': ['Create flashcards for new vocabulary.', 'Draw a diagram of the process or concept.', 'Read the chapter summary first.', 'Explain the topic to a friend.'],
        'read': ['Set a timer for 25 minutes to focus.', 'Highlight key sentences as you go.', 'Take notes in the margins.', 'Summarize each chapter in a few sentences.'],
        'write': ['Create a simple outline first.', 'Write for 15 minutes without stopping.', 'Use a thesaurus to improve your vocabulary.', 'Break the task into smaller paragraphs.'],
        'code': ['Break the problem into smaller functions.', 'Draw a flowchart of your program logic.', 'Write comments to explain your logic.', 'Debug your code with print statements.'],
        'project': ['List the 3 most important steps.', 'Set a deadline for the first milestone.', 'Gather all necessary materials.', 'Start with the easiest part first.']
    };

    const updateSummary = (tasks) => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.isDone).length;
        const performance = total > 0 ? ((completed / total) * 100).toFixed(0) : 0;
        
        totalTasksSpan.textContent = total;
        completedTasksSpan.textContent = completed;
        performanceRateSpan.textContent = `${performance}%`;
    };

    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = `task-item ${task.isDone ? 'done' : ''}`;
            
            const priorityClass = `priority-${task.priority}`;
            let suggestionsHTML = '';
            const lowercaseTask = task.text.toLowerCase();

            for (const keyword in taskSuggestions) {
                if (lowercaseTask.includes(keyword)) {
                    const suggestions = taskSuggestions[keyword];
                    const suggestionsListHTML = suggestions.map(suggestion => `<li>${suggestion}</li>`).join('');
                    suggestionsHTML = `
                        <div class="task-suggestions">
                            <h4>Suggestions:</h4>
                            <ul>${suggestionsListHTML}</ul>
                        </div>
                    `;
                    break;
                }
            }

            listItem.innerHTML = `
                <div class="task-main-content">
                    <div class="task-details">
                        <div class="task-text">${task.text}</div>
                        <div class="task-actions">
                            <span class="priority-label ${priorityClass}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                            <button class="mark-done-btn" ${task.isDone ? 'disabled' : ''}>${task.isDone ? 'Done' : 'Mark Done'}</button>
                            <button class="action-btn edit-btn" title="Edit">&#9998;</button>
                            <button class="action-btn delete-btn" title="Delete">&#128465;</button>
                        </div>
                    </div>
                </div>
                ${suggestionsHTML}
            `;

            // Handle task completion
            listItem.querySelector('.mark-done-btn').addEventListener('click', async () => {
                await fetch(`${API_URL}/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isDone: true })
                });
                loadTasks();
            });

            // Handle task deletion
            listItem.querySelector('.delete-btn').addEventListener('click', async () => {
                await fetch(`${API_URL}/${task.id}`, { method: 'DELETE' });
                loadTasks();
            });

            // Handle task editing
            const taskTextDiv = listItem.querySelector('.task-text');
            const editButton = listItem.querySelector('.edit-btn');
            
            editButton.addEventListener('click', async () => {
                if (editButton.textContent === '✓') { // Save button
                    const newText = taskTextDiv.querySelector('input').value;
                    if (newText.trim() !== '') {
                        await fetch(`${API_URL}/${task.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ text: newText })
                        });
                        loadTasks();
                    }
                } else { // Edit button
                    const currentText = task.text;
                    taskTextDiv.innerHTML = `<input type="text" value="${currentText}">`;
                    editButton.innerHTML = '&#10003;'; // Checkmark icon
                    editButton.title = 'Save';
                    taskTextDiv.querySelector('input').focus();
                }
            });

            taskList.appendChild(listItem);
        });
        updateSummary(tasks);
    };

    // Load tasks from the server on page load
    const loadTasks = async () => {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    };

    // Add a new task from the form
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        if (taskText !== '') {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: taskText, priority: taskPriority })
            });
            taskInput.value = '';
            prioritySelect.value = 'low'; // Reset priority to default
            loadTasks();
        }
    });

    // Clear all tasks
    clearTasksBtn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to clear all tasks? This cannot be undone.')) {
            await fetch(API_URL, { method: 'DELETE' });
            loadTasks();
        }
    });

    loadTasks();
});