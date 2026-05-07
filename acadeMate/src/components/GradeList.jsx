import { useSelector, useDispatch } from 'react-redux';
import { selectAllGrades, deleteGrade } from '../features/grades/gradesSlice';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectAllCourses } from '../features/courses/coursesSlice';

function GradeList() {
    const dispatch = useDispatch(), grades = useSelector(selectAllGrades);
    const students = useSelector(selectAllStudents), courses = useSelector(selectAllCourses);
    if (grades.length === 0) return <p className="empty-state">No grades recorded.</p>;
    const getName = (id) => students.find(s => s.id === id)?.name || 'Unknown';
    const getCode = (id) => courses.find(c => c.id === id)?.code || 'Unknown';
    return (
        <div className="grades-card">
            <h2>Grade Records</h2>
            <table className="course-table">
                <thead><tr>{['#','Student','Course','Grade','Sem','Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                    {grades.map((g, i) => (
                        <tr key={g.id}>
                            <td>{i + 1}</td><td>{getName(g.studentId)}</td><td>{getCode(g.courseId)}</td>
                            <td>{g.grade.toFixed(2)}</td><td>{g.semester}</td>
                            <td><button className="btn-action delete" onClick={() => dispatch(deleteGrade(g.id))}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default GradeList;
