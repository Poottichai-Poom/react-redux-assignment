function TaskItem({ task, onChange , onToggle, onDelete }) {
    return (
        <li className={`task-item${task.completed ? " completed" : ""}`}>
            <label className="task-label">
                <input type="checkbox" checked={task.completed}
                    onChange={() => onToggle(task.id)} />
                <span>{task.text}</span>
            </label>
            <button onClick={() => onChange(task.id)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>✕</button>
        </li>
    );
}
export default TaskItem;