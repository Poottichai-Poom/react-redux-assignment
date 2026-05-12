import { useState } from 'react';
import { useGetStudentsQuery } from '../features/students/studentsApi';
import { useGetCoursesQuery } from '../features/courses/coursesApi';
import { useAddGradeMutation } from '../features/grades/gradesApi';

const EMPTY_FORM = { studentId: '', courseId: '', grade: '', semester: '' };

function AddGradeForm() {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [error, setError] = useState('');

    const { data: students = [] } = useGetStudentsQuery();
    const { data: courses = [] } = useGetCoursesQuery();
    const [addGrade] = useAddGradeMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.studentId || !formData.courseId || !formData.grade.trim()) {
            setError('Please select a student, a course, and enter a grade.');
            return;
        }
        const gradeValue = parseFloat(formData.grade);
        if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 4.0) {
            setError('Grade must be a number between 0.0 and 4.0.');
            return;
        }

        try {
            await addGrade({
                studentId: Number(formData.studentId),
                courseId: Number(formData.courseId),
                grade: gradeValue,
                semester: formData.semester.trim() || '2024-1',
            }).unwrap();

            setFormData(EMPTY_FORM);
            setError('');
        } catch (err) {
            setError('Failed to add grade.');
        }
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Add Grade Record</h3>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
                <select name="studentId" value={formData.studentId} onChange={handleChange}>
                    <option value="">Select Student</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
                <select name="courseId" value={formData.courseId} onChange={handleChange}>
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.code} - {course.title}
                        </option>
                    ))}
                </select>
                <input
                    name="grade"
                    placeholder="Grade (0.0–4.0)"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={formData.grade}
                    onChange={handleChange}
                />
                <input
                    name="semester"
                    placeholder="Semester"
                    value={formData.semester}
                    onChange={handleChange}
                />
                <button type="submit" className="btn-primary">+ Add Grade</button>
            </div>
        </form>
    );
}

export default AddGradeForm;
