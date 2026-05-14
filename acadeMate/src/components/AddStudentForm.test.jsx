import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../test/server';
import { renderWithStore } from '../test/utils';
import AddStudentForm from './AddStudentForm';

const fillForm = async (user, { name = '', studentId = '', major = '', gpa = '' } = {}) => {
    if (name)      await user.type(screen.getByPlaceholderText(/full name/i), name);
    if (studentId) await user.type(screen.getByPlaceholderText(/student id/i), studentId);
    if (major)     await user.type(screen.getByPlaceholderText(/major/i), major);
    if (gpa)       await user.type(screen.getByPlaceholderText(/gpa/i), gpa);
};

describe('AddStudentForm — rendering', () => {
    it('renders Add form by default', () => {
        renderWithStore(<AddStudentForm />);
        expect(screen.getByRole('heading', { name: /add new student/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /\+ add student/i })).toBeInTheDocument();
    });

    it('renders Edit form when editingStudent is provided', () => {
        const student = { id: 1, name: 'Alice Smith', studentId: '6501001', major: 'CS', gpa: 3.8 };
        renderWithStore(<AddStudentForm editingStudent={student} onCancelEdit={vi.fn()} />);
        expect(screen.getByRole('heading', { name: /edit student/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save student/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel edit/i })).toBeInTheDocument();
    });

    it('pre-fills fields with editingStudent data', () => {
        const student = { id: 1, name: 'Alice Smith', studentId: '6501001', major: 'CS', gpa: 3.8 };
        renderWithStore(<AddStudentForm editingStudent={student} onCancelEdit={vi.fn()} />);
        expect(screen.getByPlaceholderText(/full name/i)).toHaveValue('Alice Smith');
        expect(screen.getByPlaceholderText(/student id/i)).toHaveValue('6501001');
    });
});

describe('AddStudentForm — validation', () => {
    it('shows error when name is empty', async () => {
        const user = userEvent.setup();
        renderWithStore(<AddStudentForm />);
        await fillForm(user, { studentId: '6501003', gpa: '3.0' });
        await user.click(screen.getByRole('button', { name: /\+ add student/i }));
        expect(screen.getByText(/name and student id are required/i)).toBeInTheDocument();
    });

    it('shows error when studentId is empty', async () => {
        const user = userEvent.setup();
        renderWithStore(<AddStudentForm />);
        await fillForm(user, { name: 'Carol', gpa: '3.0' });
        await user.click(screen.getByRole('button', { name: /\+ add student/i }));
        expect(screen.getByText(/name and student id are required/i)).toBeInTheDocument();
    });

    it('shows error when GPA is out of range', async () => {
        const user = userEvent.setup();
        renderWithStore(<AddStudentForm />);
        await fillForm(user, { name: 'Carol', studentId: '6501003', gpa: '5' });
        // fireEvent.submit bypasses native HTML constraint validation (max="4")
        // so our custom JS validation path is reached
        fireEvent.submit(document.querySelector('form'));
        expect(screen.getByText(/gpa must be a number between 0.0 and 4.0/i)).toBeInTheDocument();
    });
});

describe('AddStudentForm — submission', () => {
    it('adds student and resets form on valid submit', async () => {
        const user = userEvent.setup();
        renderWithStore(<AddStudentForm />);
        await fillForm(user, { name: 'Carol', studentId: '6501003', major: 'Math', gpa: '3.5' });
        await user.click(screen.getByRole('button', { name: /\+ add student/i }));
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/full name/i)).toHaveValue('');
        });
    });

    it('defaults major to Undeclared when left blank', async () => {
        let capturedBody;
        server.use(
            http.post('http://localhost:3000/students', async ({ request }) => {
                capturedBody = await request.json();
                return HttpResponse.json({ id: 99, ...capturedBody }, { status: 201 });
            })
        );
        const user = userEvent.setup();
        renderWithStore(<AddStudentForm />);
        await fillForm(user, { name: 'Dave', studentId: '6501004', gpa: '2.5' });
        await user.click(screen.getByRole('button', { name: /\+ add student/i }));
        await waitFor(() => expect(capturedBody?.major).toBe('Undeclared'));
    });

    it('calls updateStudent and onCancelEdit on save in edit mode', async () => {
        const onCancelEdit = vi.fn();
        const student = { id: 1, name: 'Alice Smith', studentId: '6501001', major: 'CS', gpa: 3.8 };
        const user = userEvent.setup();
        renderWithStore(<AddStudentForm editingStudent={student} onCancelEdit={onCancelEdit} />);
        await user.click(screen.getByRole('button', { name: /save student/i }));
        await waitFor(() => expect(onCancelEdit).toHaveBeenCalled());
    });

    it('calls onCancelEdit when Cancel Edit is clicked', async () => {
        const onCancelEdit = vi.fn();
        const student = { id: 1, name: 'Alice Smith', studentId: '6501001', major: 'CS', gpa: 3.8 };
        renderWithStore(<AddStudentForm editingStudent={student} onCancelEdit={onCancelEdit} />);
        await userEvent.click(screen.getByRole('button', { name: /cancel edit/i }));
        expect(onCancelEdit).toHaveBeenCalled();
    });

    it('shows error message when server returns error', async () => {
        server.use(
            http.post('http://localhost:3000/students', () =>
                HttpResponse.json({ message: 'Server Error' }, { status: 500 })
            )
        );
        const user = userEvent.setup();
        renderWithStore(<AddStudentForm />);
        await fillForm(user, { name: 'Eve', studentId: '6501005', gpa: '3.0' });
        await user.click(screen.getByRole('button', { name: /\+ add student/i }));
        expect(await screen.findByText(/failed to save student/i)).toBeInTheDocument();
    });
});
