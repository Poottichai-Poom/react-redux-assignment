import { useSelector, useDispatch } from 'react-redux';
import { selectAllCourses, deleteCourse } from '../features/courses/coursesSlice';

function CourseList() {
    const dispatch = useDispatch(), courses = useSelector(selectAllCourses);
    if (!courses.length) return <p className="empty-state">No courses.</p>;
    return (
        <div className="courses-card">
            <h2>Course Catalog ({courses.length})</h2>
            <table className="course-table">
                <thead><tr>{['#','Code','Title','Credits','Dept','Actions'].map(h => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                    {courses.map((c, i) => (
                        <tr key={c.id}>
                            <td>{i+1}</td><td>{c.code}</td><td>{c.title}</td><td>{c.credits}</td><td>{c.dept}</td>
                            <td><button className="btn-action delete" onClick={() => dispatch(deleteCourse(c.id))}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default CourseList;
