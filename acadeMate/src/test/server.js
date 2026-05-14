import { setupServer } from 'msw/node';
import { studentHandlers } from './students';

export const server = setupServer(...studentHandlers);
