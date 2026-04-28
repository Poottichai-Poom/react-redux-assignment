function TaskEditInput({ initialText, onSave, onCancel }) {
    const [editText, setEditText] = useState(initialText);
    function handleSubmit(e) {
        e.preventDefault();
        const trimmed = editText.trim();
        if (trimmed !== "") { onSave(trimmed); }
    }
    return (
        <form onSubmit={handleSubmit} className="task-edit-form">
            <input type="text" value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="task-edit-input" />
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </form>
    );
}

export default TaskEditInput;