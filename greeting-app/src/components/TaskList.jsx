import TaskItem from "./TaskItem";

function TaskList({ tasks, onChange, onToggle, onDelete }) {
    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onChange={onChange} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    );
}
export default TaskList;