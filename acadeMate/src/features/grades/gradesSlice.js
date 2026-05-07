import { createSlice } from '@reduxjs/toolkit';
const gradesSlice = createSlice({
    name: 'grades',
    initialState: { list: [] },
    reducers: {
        addGrade: (state, action) => {
            state.list.push({
                id: Date.now(),
                ...action.payload,
                // payload: { studentId,
                // courseId, grade, semester }
            });
        },
        updateGrade: (state, action) => {
            const i = state.list.findIndex(
                g => g.id === action.payload.id);
            if (i !== -1) state.list[i] =
                action.payload;
        },
        deleteGrade: (state, action) => {
            state.list = state.list.filter(
                g => g.id !== action.payload);
        },
    },
});
export const { addGrade, updateGrade, deleteGrade } =
    gradesSlice.actions;
export const selectAllGrades = (state) => state.grades.list;
export const selectGradeStats = (state) => {
    const list = state.grades.list;
    const count = list.length;
    const average = count === 0 ? "0.00" : (list.reduce((sum, g) => sum + g.grade, 0) / count).toFixed(2);
    return { count, average };
};
export default gradesSlice.reducer;