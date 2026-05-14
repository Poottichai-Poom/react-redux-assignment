import { createElement } from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { studentsApi } from '../features/students/studentsApi';

export function makeStore() {
    return configureStore({
        reducer: {
            [studentsApi.reducerPath]: studentsApi.reducer,
        },
        middleware: (get) => get().concat(studentsApi.middleware),
    });
}

export function renderWithStore(ui, { store = makeStore() } = {}) {
    return {
        ...render(createElement(Provider, { store }, ui)),
        store,
    };
}
