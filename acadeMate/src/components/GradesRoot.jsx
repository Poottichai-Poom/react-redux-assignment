import AddGradeForm from './AddGradeForm';
import GradeList from './GradeList';
import { useGetGradesQuery } from '../features/grades/gradesApi';

function GradesRoot() {
    const { data: grades = [] } = useGetGradesQuery();

    const calculateAverage = () => {
        if (grades.length === 0) return 0;
        return (grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length).toFixed(2);
    };

    return (
        <div className="grades-root">
            <section className="grades-summary-panel">
                <div className="stat-card">
                    <span className="stat-label">Grade Records</span>
                    <span className="stat-value">{grades.length}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Average Grade</span>
                    <span className="stat-value">{calculateAverage()}</span>
                </div>
            </section>
            <AddGradeForm />
            <GradeList />
        </div>
    );
}

export default GradesRoot;
