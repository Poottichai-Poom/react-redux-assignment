import React from 'react';
import GpaSummary from './GpaSummary';
import AddStudentForm from './AddStudentForm';
import StudentTable from './StudentTable';

function StudentRoot({
  editingStudent,
  onAddStudent,
  onSaveStudent,
  onCancelEdit,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <div className="students-root">
      <GpaSummary />
      <AddStudentForm
        editingStudent={editingStudent}
        onAddStudent={onAddStudent}
        onSaveStudent={onSaveStudent}
        onCancelEdit={onCancelEdit}
      />
      <StudentTable
        onEditStudent={onEditStudent}
        onDeleteStudent={onDeleteStudent}
      />
    </div>
  );
}

export default StudentRoot;
