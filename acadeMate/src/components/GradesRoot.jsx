import { useSelector } from 'react-redux';
import { selectGradeStats } from '../features/grades/gradesSlice';
import AddGradeForm from './AddGradeForm';
import GradeList from './GradeList';

function GradesRoot() {
    const { count, average } = useSelector(selectGradeStats);

    return (
        <div className="grades-root">
            <section className="grades-summary-panel">
                <div className="stat-card">
                    <span className="stat-label">Grade Records</span>
                    <span className="stat-value">{count}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Average Grade</span>
                    <span className="stat-value">{average}</span>
                </div>
            </section>
            <AddGradeForm />
            <GradeList />
        </div>
    );
}

export default GradesRoot;
