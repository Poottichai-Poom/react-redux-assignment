import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudentAsync, updateStudentAsync } from "../features/students/studentsThunks";
import { selectAllStudents, selectStudentsStatus } from "../features/students/selectors";
import EditModal from "./EditModal";

function StudentTable() {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(null);
    const students = useSelector(selectAllStudents);
    const status = useSelector(selectStudentsStatus);

    if (status !== "succeeded") return <p>Loading students...</p>;

    const handleDelete = (id) => window.confirm("Delete?") && dispatch(deleteStudentAsync(id));
    const handleSave = (data) => { dispatch(updateStudentAsync({ ...data, gpa: parseFloat(data.gpa) || 0 })); setEditing(null); };

    return (
        <>
            <table className="student-table">
                <thead><tr>{['#','Name','ID','Major','GPA','Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                    {students.map((s, i) => (
                        <tr key={s.id} className={s.gpa >= 3.5 ? "high-gpa" : ""}>
                            <td>{i + 1}</td><td>{s.name}</td><td>{s.studentId}</td><td>{s.major}</td>
                            <td>{s.gpa.toFixed(2)}</td>
                            <td>
                                <button onClick={() => setEditing(s)}>Edit</button>
                                <button onClick={() => handleDelete(s.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editing && <EditModal student={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}
        </>
    );
}
export default StudentTable;