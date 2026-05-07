import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllStudents } from '../features/students/studentsSlice';
import { selectAllCourses } from '../features/courses/coursesSlice';
import { addGrade } from '../features/grades/gradesSlice';
const EMPTY = { studentId: '', courseId: '', grade: '', semester: '' };

function AddGradeForm() {
    const dispatch = useDispatch(), students = useSelector(selectAllStudents), courses = useSelector(selectAllCourses);
    const [form, setForm] = useState(EMPTY), [err, setErr] = useState('');
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        const val = parseFloat(form.grade);
        if (!form.studentId || !form.courseId || isNaN(val) || val < 0 || val > 4) return setErr('Invalid data');
        dispatch(addGrade({ studentId: Number(form.studentId), courseId: Number(form.courseId), grade: val, semester: form.semester || '2024-1' }));
        setForm(EMPTY); setErr('');
    };
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add Grade</h3>
            {err && <p className="form-error">{err}</p>}
            <div className="form-row">
                <select name="studentId" value={form.studentId} onChange={handleChange}>
                    <option value="">Student</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <select name="courseId" value={form.courseId} onChange={handleChange}>
                    <option value="">Course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
                </select>
                <input name="grade" placeholder="Grade" type="number" step="0.01" value={form.grade} onChange={handleChange} />
                <input name="semester" placeholder="Sem" value={form.semester} onChange={handleChange} />
                <button type="submit" className="btn-primary">+ Add</button>
            </div>
        </form>
    );
}
export default AddGradeForm;
