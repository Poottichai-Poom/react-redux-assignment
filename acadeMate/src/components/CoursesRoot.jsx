import React from 'react';
import AddCourseForm from './AddCourseForm';
import CourseList from './CourseList';

function CoursesRoot({ courses, onAddCourse, onDeleteCourse }) {
  return (
    <div className="courses-root">
      <AddCourseForm onAddCourse={onAddCourse} />
      <CourseList courses={courses} onDeleteCourse={onDeleteCourse} />
    </div>
  );
}

export default CoursesRoot;
