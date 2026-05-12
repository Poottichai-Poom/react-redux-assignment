import { useSelector } from 'react-redux';
import { selectStudentIds, selectStudentById } from '../features/students/studentsSlice';

function StudentRow({ id, index, onEditStudent, onDeleteStudent }) {
    const student = useSelector((state) => selectStudentById(state, id));
    if (!student) return null;

    return (
        <tr className={student.gpa >= 3.5 ? "high-gpa" : ""}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.studentId}</td>
            <td>{student.major}</td>
            <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
            <td className="action-cell">
                <button type="button" className="btn-secondary" onClick={() => onEditStudent?.(student)}>
                    Edit
                </button>
                <button type="button" className="btn-danger" onClick={() => onDeleteStudent?.(student.id)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}

function StudentTable({ onEditStudent, onDeleteStudent }) {
    const studentIds = useSelector(selectStudentIds);

    if (studentIds.length === 0) {
        return <p className="empty-state">No students yet. Add one above!</p>;
    }
    return (
        <table className="student-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Major</th>
                    <th>GPA</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {studentIds.map((id, index) => (
                    <StudentRow
                        key={id}
                        id={id}
                        index={index}
                        onEditStudent={onEditStudent}
                        onDeleteStudent={onDeleteStudent}
                    />
                ))}
            </tbody>
        </table>
    );
}
export default StudentTable;