import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentAsync } from "../features/students/studentsThunks";
const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };
function AddStudentForm() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState("");
    const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        const gpaNum = parseFloat(form.gpa);
        if (!form.name.trim() || !form.studentId.trim()) return setError("Required fields missing");
        if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) return setError("Invalid GPA");
        dispatch(addStudentAsync({ ...form, major: form.major || "Undeclared", gpa: gpaNum }));
        setForm(EMPTY_FORM); setError("");
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add New Student</h3>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
                {['name', 'studentId', 'major', 'gpa'].map(f => (
                    <input key={f} name={f} value={form[f]} onChange={handleChange} 
                           placeholder={f === 'gpa' ? 'GPA (0.0–4.0)' : f.charAt(0).toUpperCase() + f.slice(1)} 
                           type={f === 'gpa' ? 'number' : 'text'} step="0.01" />
                ))}
                <button type="submit" className="btn-primary">+ Add Student</button>
            </div>
        </form>
    );
}
export default AddStudentForm;