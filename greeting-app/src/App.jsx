import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseSummary from './components/ExpenseSummary';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import style from './App.module.css';
function App() {
  const title = import.meta.env.VITE_APP_APP_TITLE || 'Expense Tracker';
  return (
    <ExpenseProvider>
      <div className={style.app}>
        <header>
          <h1>{title}</h1>
        </header>
        <div className={style['main-layout']}>
          <aside>
            <ExpenseSummary />
          </aside>
          <main>
            <AddExpenseForm />
            <ExpenseList />
          </main>
        </div>
      </div>
    </ExpenseProvider>
  );
}
export default App;