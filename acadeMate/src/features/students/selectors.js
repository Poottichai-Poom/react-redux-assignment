import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents } from './studentsSlice';

// Memoized selector for high GPA students (>= 3.5)
export const selectHighGpaStudents = createSelector(
    [selectAllStudents],
    (students) => students.filter(s => s.gpa >= 3.5)
);

// Memoized selector for students by major
export const selectStudentsByMajor = createSelector(
    [selectAllStudents, (state, major) => major],
    (students, major) => students.filter(s => s.major === major)
);
