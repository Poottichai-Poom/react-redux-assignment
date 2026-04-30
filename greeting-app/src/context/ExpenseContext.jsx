import { createContext, useContext, useReducer, useEffect } from 'react';
const ExpenseContext = createContext();
const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];
function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD': return { ...state, expenses: [...state.expenses, action.payload] };
        case "LOAD": return { ...state, expenses: action.payload };
        case 'EDIT': return { ...state, expenses: state.expenses.map(e => e.id === action.payload.id ? action.payload : e) };
        case 'DELETE': return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
        case 'FILTER': return { ...state, filter: action.payload };
        case 'SET_BUDGET': return { ...state, budget: action.payload };
        default: return state;
    }
}
const initialState = { expenses: [], filter: 'All', budget: 0 };
export function ExpenseProvider({ children }) {
    const [state, dispatch] = useReducer(expenseReducer, initialState);
    useEffect(() => {
        const s = localStorage.getItem('expenses');
        if (s) dispatch({ type: 'LOAD', payload: JSON.parse(s) });
        const b = localStorage.getItem('budget');
        if (b) dispatch({ type: 'SET_BUDGET', payload: parseFloat(b) });
    }, []);
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
    }, [state.expenses]);
    useEffect(() => {
        localStorage.setItem('budget', state.budget.toString());
    }, [state.budget]);
    const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);
    const filteredExpenses = state.filter === 'All' ? state.expenses
        : state.expenses.filter(e => e.category === state.filter);
    function addExpense(name, amount, category) {
        dispatch({
            type: 'ADD', payload: {
                id: Date.now(), name, amount: parseFloat(amount), category,

                date: new Date().toLocaleDateString()
            }
        });
    }
    function editExpense(id, name, amount, category) {
        const expense = state.expenses.find(e => e.id === id);
        dispatch({
            type: 'EDIT', payload: {
                id, name, amount: parseFloat(amount), category, date: expense.date
            }
        });
    }
    function deleteExpense(id) { dispatch({ type: 'DELETE', payload: id }); }
    function setFilter(cat) { dispatch({ type: 'FILTER', payload: cat }); }
    function setBudget(amount) { dispatch({ type: 'SET_BUDGET', payload: parseFloat(amount) }); }
    function exportToCSV() {
        const headers = ['Name', 'Amount', 'Category', 'Date'];
        const rows = state.expenses.map(e => [e.name, e.amount, e.category, e.date]);
        const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    }
    return (<ExpenseContext.Provider value={{
        expenses: state.expenses,
        filteredExpenses, totalAmount, filter: state.filter, categories: CATEGORIES, budget: state.budget,
        addExpense, deleteExpense, setFilter, editExpense, setBudget, exportToCSV
    }}>
        {children}</ExpenseContext.Provider>);
}
export function useExpenses() { return useContext(ExpenseContext); }