import { useSelector } from "react-redux";
import { selectStudentCount, selectAverageGpa, selectHighAchievers } from "../features/students/selectors";

function GpaSummary() {
    const stats = [
        { label: "Total Students", value: useSelector(selectStudentCount) },
        { label: "Average GPA", value: useSelector(selectAverageGpa) },
        { label: "High Achievers (≥3.5)", value: useSelector(selectHighAchievers).length }
    ];
    return (
        <div className="gpa-summary">
            {stats.map(s => (
                <div key={s.label} className="stat-card">
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                </div>
            ))}
        </div>
    );
}
export default GpaSummary;