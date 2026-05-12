import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Hard-coded initial data — Session 4 replaces this with API data
const INITIAL_STUDENTS = [
    { id: 1, name: 'Somchai Rakpong', studentId: '6501001', major: 'Computer Science', gpa: 3.85 },
    { id: 2, name: 'Naree Thongdee', studentId: '6501002', major: 'Information Technology', gpa: 3.60 },
    { id: 3, name: 'Krit Suwan', studentId: '6501003', major: 'Computer Science', gpa: 2.95 },
    { id: 4, name: 'Malee Jaikaew', studentId: '6501004', major: 'Business IT', gpa: 3.40 },
    { id: 5, name: 'Pong Srisuk', studentId: '6501005', major: 'Information Technology', gpa: 3.75 },
];

const studentsAdapter = createEntityAdapter();

const initialState = studentsAdapter.getInitialState({
    status: 'idle', // 'idle'|'loading'|'succeeded'|'failed'
    error: null,
});

// Pre-populate with initial data
const prePopulatedState = studentsAdapter.setAll(initialState, INITIAL_STUDENTS);

const studentsSlice = createSlice({
    name: 'students',
    initialState: prePopulatedState,
    reducers: {
        addStudent: studentsAdapter.addOne,
        deleteStudent: studentsAdapter.removeOne,
        updateStudent: (state, action) => {
            studentsAdapter.updateOne(state, { 
                id: action.payload.id, 
                changes: action.payload 
            });
        },
    },
    extraReducers: (builder) => {
        // Keep extraReducers placeholder as requested
    },
});

// Named exports: action creators — used in components (Session 3)
export const { addStudent, deleteStudent, updateStudent } = studentsSlice.actions;

// Default export: reducer — imported in store.js
export default studentsSlice.reducer;

// Export selectors from the adapter
export const {
    selectAll: selectAllStudents,
    selectById: selectStudentById,
    selectIds: selectStudentIds,
} = studentsAdapter.getSelectors(state => state.students);