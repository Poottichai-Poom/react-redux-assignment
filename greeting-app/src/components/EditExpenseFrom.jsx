import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
function EditExpenseForm({ id, onClose }) {
    const { expenses, editExpense, categories } = useExpenses();
    const exp = expenses.find(e => e.id === id);
    const [name, setName] = useState(exp?.name || '');
    const [amount, setAmount] = useState(exp?.amount.toString() || '');
    const [category, setCategory] = useState(exp?.category || categories[0]);
    const [error, setError] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            setError('Enter name');
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setError('Enter amount');
            return;
        }
        editExpense(id, name.trim(), amount, category);
        onClose();
    }
    return (<form onSubmit={handleSubmit} className="edit-form">
        {error && <p className='form-error'>{error}</p>}
        <input value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Expense name' />
        <input type='number' value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='Amount' />
        <select value={category}
            onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option
                key={c}>{c}</option>)}
        </select>
        <button type='submit'>Save</button>
        <button type='button' onClick={onClose}>Cancel</button>
    </form>);
}
export default EditExpenseForm;