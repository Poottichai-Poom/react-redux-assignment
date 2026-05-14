import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { studentsApi } from "../features/students/studentsApi";
import { coursesApi } from "../features/courses/coursesApi";
import { gradesApi } from "../features/grades/gradesApi";
import { loggerMiddleware } from "./middleware/logger";

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
            gradesApi.middleware,
            loggerMiddleware
        ),
});

setupListeners(store.dispatch);