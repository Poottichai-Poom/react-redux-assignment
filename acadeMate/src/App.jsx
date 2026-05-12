import './App.css';
import { useState } from 'react';
import StudentRoot from './components/StudentRoot';
import CoursesRoot from './components/CoursesRoot';
import GradesRoot from './components/GradesRoot';
import { useDeleteStudentMutation } from './features/students/studentsApi';

function App() {
  const [deleteStudent] = useDeleteStudentMutation();
  const [editingStudent, setEditingStudent] = useState(null);
  const [activeRoot, setActiveRoot] = useState('students');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate — RTK Query Migration</h1>
      </header>
      <main className="app-main">
        <div className="root-nav">
          <button
            className={activeRoot === 'students' ? 'tab active' : 'tab'}
            onClick={() => setActiveRoot('students')}
          >
            Students
          </button>
          <button
            className={activeRoot === 'grades' ? 'tab active' : 'tab'}
            onClick={() => setActiveRoot('grades')}
          >
            Grades
          </button>
          <button
            className={activeRoot === 'courses' ? 'tab active' : 'tab'}
            onClick={() => setActiveRoot('courses')}
          >
            Courses
          </button>
        </div>
        {activeRoot === 'students' ? (
          <StudentRoot
            editingStudent={editingStudent}
            onCancelEdit={() => setEditingStudent(null)}
            onEditStudent={(student) => setEditingStudent(student)}
            onDeleteStudent={(id) => deleteStudent(id)}
          />
        ) : activeRoot === 'grades' ? (
          <GradesRoot />
        ) : (
          <CoursesRoot />
        )}
      </main>
    </div>
  );
}
export default App;