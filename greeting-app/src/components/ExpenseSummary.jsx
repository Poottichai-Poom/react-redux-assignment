import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

function ExpenseSummary() {
    const { expenses, totalAmount, categories, budget, setBudget, exportToCSV } = useExpenses();
    const [newBudget, setNewBudget] = useState(budget.toString());
    const [editingBudget, setEditingBudget] = useState(false);

    const byCategory = categories.reduce((acc, cat) => {
        const total = expenses
            .filter(e => e.category === cat)
            .reduce((s, e) => s + e.amount, 0);
        if (total > 0) acc[cat] = total;
        return acc;
    }, {});

    const budgetPercentage = budget > 0 ? Math.round((totalAmount / budget) * 100) : 0;
    const budgetStatus = budgetPercentage > 100 ? 'over-budget' : budgetPercentage > 80 ? 'warning' : '';

    function handleSaveBudget() {
        setBudget(newBudget);
        setEditingBudget(false);
    }

    return (
        <div className='summary'>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <p>{expenses.length} transactions</p>
            
            <div className={`budget-section ${budgetStatus}`}>
                {editingBudget ? (
                    <div className='budget-edit'>
                        <input
                            type='number'
                            value={newBudget}
                            onChange={e => setNewBudget(e.target.value)}
                            placeholder='Monthly budget'
                        />
                        <button onClick={handleSaveBudget}>Set</button>
                        <button onClick={() => setEditingBudget(false)}>Cancel</button>
                    </div>
                ) : (
                    <div className='budget-display'>
                        <p>Monthly Budget: ${budget.toFixed(2)}</p>
                        {budget > 0 && (
                            <>
                                <div className='budget-bar'>
                                    <div className='budget-used' style={{ width: `${Math.min(budgetPercentage, 100)}%` }} />
                                </div>
                                <p className='budget-percent'>{budgetPercentage}% Used</p>
                            </>
                        )}
                        <button onClick={() => setEditingBudget(true)}>Edit Budget</button>
                    </div>
                )}
            </div>

            {Object.entries(byCategory).map(([cat, amt]) => (
                <div key={cat}>{cat}: ${amt.toFixed(2)}</div>
            ))}

            <button onClick={exportToCSV} className='export-btn'>📥 Export CSV</button>
        </div>
    );
}
export default ExpenseSummary;