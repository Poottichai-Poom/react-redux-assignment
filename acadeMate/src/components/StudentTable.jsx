import { useGetStudentsQuery } from '../features/students/studentsApi';

function StudentRow({ student, index, onEditStudent, onDeleteStudent }) {
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
    const { data: students = [], isLoading } = useGetStudentsQuery(undefined, {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    if (isLoading) return <p className="empty-state">Loading students...</p>;

    if (students.length === 0) {
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
                {students.map((student, index) => (
                    <StudentRow
                        key={student.id}
                        student={student}
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