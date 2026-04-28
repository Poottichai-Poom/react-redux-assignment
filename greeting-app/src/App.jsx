import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import './App.css'

const initialTasks = [
  { id: 1, text: 'Complete React Session 3', completed: true },
  { id: 2, text: 'Read React docs', completed: false },
  { id: 3, text: 'Read React documentation', completed: false },
];
let nextId = 4;
function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  function handleAddTask(text) {
    setTasks([...tasks, { id: nextId++, text, completed: false }]);
  }

  function handleToggle(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }
  function handleDelete(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }
  function handleEdit(id) {
    const newText = prompt("Edit task:");
    if (newText) {
      setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    }
  }
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });
  // ... render JSX (filter buttons + TaskInput + filtered.map(TaskItem))
  return (<div className="app">
    <h1>Todo List</h1>
    <TaskInput onAddTask={handleAddTask} />
    <div className="filters">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
      <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
      <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
    </div>
    <ul className="task-list">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} onChange={handleEdit} onToggle={handleToggle} onDelete={handleDelete} />
      ))}
    </ul>
  </div>);

}

export default App;