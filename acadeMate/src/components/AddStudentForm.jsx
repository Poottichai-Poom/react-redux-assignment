import { useState, useEffect } from 'react';
import { useAddStudentMutation, useUpdateStudentMutation } from '../features/students/studentsApi';

const EMPTY_FORM = { name: '', studentId: '', major: '', gpa: '' };

function AddStudentForm({ editingStudent, onCancelEdit }) {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [error, setError] = useState('');
    
    const [addStudent] = useAddStudentMutation();
    const [updateStudent] = useUpdateStudentMutation();

    useEffect(() => {
        if (editingStudent) {
            setFormData({
                name: editingStudent.name,
                studentId: editingStudent.studentId,
                major: editingStudent.major,
                gpa: editingStudent.gpa.toString(),
            });
        } else {
            setFormData(EMPTY_FORM);
        }
    }, [editingStudent]);

    // Single handler for ALL inputs via computed property name
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Validation
        if (!formData.name.trim() || !formData.studentId.trim()) {
            setError('Name and Student ID are required.');
            return;
        }
        const gpaNum = parseFloat(formData.gpa);
        if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
            setError('GPA must be a number between 0.0 and 4.0.');
            return;
        }

        const studentPayload = {
            name: formData.name.trim(),
            studentId: formData.studentId.trim(),
            major: formData.major.trim() || 'Undeclared',
            gpa: gpaNum,
        };

        try {
            if (editingStudent) {
                await updateStudent({ ...studentPayload, id: editingStudent.id }).unwrap();
                onCancelEdit?.();
            } else {
                await addStudent(studentPayload).unwrap();
            }
            setFormData(EMPTY_FORM); // Reset form after successful submit
            setError('');
        } catch (err) {
            setError('Failed to save student. Please try again.');
        }
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
                <input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} />
                <input name="studentId" placeholder="Student ID *" value={formData.studentId} onChange={handleChange} />
                <input name="major" placeholder="Major" value={formData.major} onChange={handleChange} />
                <input name="gpa" placeholder="GPA (0.0–4.0)" value={formData.gpa} onChange={handleChange}
                    type="number" step="0.01" min="0" max="4" />
                <button type="submit" className="btn-primary">
                    {editingStudent ? 'Save Student' : '+ Add Student'}
                </button>
            </div>
            {editingStudent && (
                <div className="form-row form-actions">
                    <button type="button" className="btn-secondary" onClick={onCancelEdit}>
                        Cancel Edit
                    </button>
                </div>
            )}
        </form>);
}
export default AddStudentForm;