import { useGetGradesQuery, useDeleteGradeMutation } from '../features/grades/gradesApi';
import { useGetStudentsQuery } from '../features/students/studentsApi';
import { useGetCoursesQuery } from '../features/courses/coursesApi';

function GradeList() {
    const { data: grades = [], isLoading } = useGetGradesQuery();
    const { data: students = [] } = useGetStudentsQuery();
    const { data: courses = [] } = useGetCoursesQuery();
    const [deleteGrade] = useDeleteGradeMutation();

    if (isLoading) return <p className="empty-state">Loading grades...</p>;

    if (grades.length === 0) {
        return <p className="empty-state">No grades recorded yet. Add one above!</p>;
    }

    const getStudentName = (id) => students.find((s) => s.id === id)?.name || 'Unknown';
    const getCourseCode = (id) => courses.find((c) => c.id === id)?.code || 'Unknown';

    return (
        <div className="grades-card">
            <h2>Grade Records</h2>
            <table className="course-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Grade</th>
                        <th>Semester</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade, index) => (
                        <tr key={grade.id}>
                            <td>{index + 1}</td>
                            <td>{getStudentName(grade.studentId)}</td>
                            <td>{getCourseCode(grade.courseId)}</td>
                            <td>{grade.grade.toFixed(2)}</td>
                            <td>{grade.semester}</td>
                            <td>
                                <button type="button" className="btn-action delete" onClick={() => deleteGrade(grade.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GradeList;
