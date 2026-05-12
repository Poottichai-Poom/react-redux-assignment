import { useState } from 'react';
import { useAddCourseMutation } from '../features/courses/coursesApi';

const EMPTY_FORM = { code: '', title: '', credits: '', dept: '' };

function AddCourseForm() {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [error, setError] = useState('');
    const [addCourse] = useAddCourseMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.code.trim() || !formData.title.trim()) {
            setError('Course code and title are required.');
            return;
        }
        const creditsNum = parseInt(formData.credits, 10);
        if (isNaN(creditsNum) || creditsNum <= 0) {
            setError('Credits must be a positive number.');
            return;
        }

        try {
            await addCourse({
                code: formData.code.trim().toUpperCase(),
                title: formData.title.trim(),
                credits: creditsNum,
                dept: formData.dept.trim() || 'General',
            }).unwrap();

            setFormData(EMPTY_FORM);
            setError('');
        } catch (err) {
            setError('Failed to add course.');
        }
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add New Course</h3>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
                <input name="code" placeholder="Course Code *" value={formData.code} onChange={handleChange} />
                <input name="title" placeholder="Course Title *" value={formData.title} onChange={handleChange} />
                <input name="credits" placeholder="Credits" type="number" min="1" value={formData.credits} onChange={handleChange} />
                <input name="dept" placeholder="Department" value={formData.dept} onChange={handleChange} />
                <button type="submit" className="btn-primary">+ Add Course</button>
            </div>
        </form>
    );
}

export default AddCourseForm;
