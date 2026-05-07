import './App.css';
import { useState } from 'react';
import StudentRoot from './components/StudentRoot';
import CoursesRoot from './components/CoursesRoot';
import GradesRoot from './components/GradesRoot';


function App() {
  const [activeRoot, setActiveRoot] = useState('students');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate — Session 2 Redux Migration</h1>
      </header>
      <main className="app-main">
        <div className="root-nav">
          {['students', 'grades', 'courses'].map(tab => (
            <button
              key={tab}
              className={activeRoot === tab ? 'tab active' : 'tab'}
              onClick={() => setActiveRoot(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {activeRoot === 'students' && <StudentRoot />}
        {activeRoot === 'grades' && <GradesRoot />}
        {activeRoot === 'courses' && <CoursesRoot />}
      </main>
    </div>
  );
}
export default App;