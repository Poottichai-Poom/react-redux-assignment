import { configureStore } from "@reduxjs/toolkit";
// Import slice reducers (we will create these in Steps 2–4)
import { studentsApi } from "../features/students/studentsApi";
import { coursesApi } from "../features/courses/coursesApi";
import { gradesApi } from "../features/grades/gradesApi";

export const store = configureStore({
    reducer: {
        [studentsApi.reducerPath]: studentsApi.reducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [gradesApi.reducerPath]: gradesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            studentsApi.middleware,
            coursesApi.middleware,
            gradesApi.middleware
        ),
    // ↑ configureStore internally calls combineReducers({ students, courses, grades })
    // ↑ redux-thunk middleware is included automatically
    // ↑ Redux DevTools is configured automatically in development mode
});