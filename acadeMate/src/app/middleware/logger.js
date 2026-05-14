const isDev = import.meta.env.MODE === 'development';

export const loggerMiddleware = (store) => (next) => (action) => {
    if (isDev) {
        console.group(`[Redux] ${action.type}`);
        console.log('prev state:', store.getState());
        console.log('action    :', action);
    }
    const result = next(action);
    if (isDev) {
        console.log('next state:', store.getState());
        console.groupEnd();
    }
    return result;
};
