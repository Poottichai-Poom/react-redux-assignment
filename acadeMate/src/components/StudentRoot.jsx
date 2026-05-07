import GpaSummary from './GpaSummary';
import AddStudentForm from './AddStudentForm';
import StudentTable from './StudentTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStudents } from '../features/students/studentsSlice';


function StudentRoot() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  return (
    <div className="students-root">
      <GpaSummary />
      <AddStudentForm />
      <StudentTable />
    </div>
  );
}

export default StudentRoot;
