import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import EditExpenseForm from './EditExpenseFrom.jsx';

const COLORS = { Food: '#ff9500', Transport: '#0077cc', Health: '#10b981' };

function ExpenseList() {
    const { filteredExpenses, deleteExpense, filter, setFilter, categories } = useExpenses();
    const [editingId, setEditingId] = useState(null);

    return (<div>
        {['All', ...categories].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
                className={filter === cat ? 'tab active' : 'tab'}>{cat}</button>
        ))}
        {filteredExpenses.map(exp => (
            <div key={exp.id} className='expense-item'>
                <span style={{ background: COLORS[exp.category] }} /> <b>{exp.name}</b>
                <span>${exp.amount.toFixed(2)}</span>
                <button onClick={() => setEditingId(exp.id)}>✏️</button>
                <button onClick={() => deleteExpense(exp.id)}>✕</button>
            </div>
        ))}
        {editingId && (
            <EditExpenseForm id={editingId} onClose={() => setEditingId(null)} />
        )}
    </div>);
}
export default ExpenseList;