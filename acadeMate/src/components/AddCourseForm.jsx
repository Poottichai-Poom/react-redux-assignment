import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../features/courses/coursesSlice';
const EMPTY = { code: '', title: '', credits: '', dept: '' };

function AddCourseForm() {
    const dispatch = useDispatch();
    const [form, setForm] = useState(EMPTY);
    const [err, setErr] = useState('');
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        const credits = parseInt(form.credits, 10);
        if (!form.code.trim() || !form.title.trim()) return setErr('Missing fields');
        if (isNaN(credits) || credits <= 0) return setErr('Invalid credits');
        dispatch(addCourse({ ...form, id: Date.now(), code: form.code.toUpperCase(), credits }));
        setForm(EMPTY); setErr('');
    };
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add Course</h3>
            {err && <p className="form-error">{err}</p>}
            <div className="form-row">
                {['code', 'title', 'credits', 'dept'].map(f => (
                    <input key={f} name={f} placeholder={f} value={form[f]} onChange={handleChange} type={f==='credits'?'number':'text'} />
                ))}
                <button type="submit" className="btn-primary">+ Add</button>
            </div>
        </form>
    );
}
export default AddCourseForm;
