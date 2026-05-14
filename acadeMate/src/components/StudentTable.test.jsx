import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { server } from '../test/server';
import { mockStudents } from '../test/students';
import { renderWithStore } from '../test/utils';
import StudentTable from './StudentTable';

describe('StudentTable — loading & data', () => {
    it('shows loading state initially', () => {
        renderWithStore(<StudentTable />);
        expect(screen.getByText(/loading students/i)).toBeInTheDocument();
    });

    it('renders a row for each student after fetch', async () => {
        renderWithStore(<StudentTable />);
        expect(await screen.findByText('Alice Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    });

    it('displays student ID and major', async () => {
        renderWithStore(<StudentTable />);
        await screen.findByText('Alice Smith');
        expect(screen.getByText('6501001')).toBeInTheDocument();
        expect(screen.getByText('Computer Science')).toBeInTheDocument();
    });

    it('displays GPA formatted to 2 decimal places', async () => {
        renderWithStore(<StudentTable />);
        await screen.findByText('Alice Smith');
        expect(screen.getByText('3.80')).toBeInTheDocument();
        expect(screen.getByText('2.90')).toBeInTheDocument();
    });

    it('shows empty state when server returns no students', async () => {
        server.use(
            http.get('http://localhost:3000/students', () => HttpResponse.json([]))
        );
        renderWithStore(<StudentTable />);
        expect(await screen.findByText(/no students yet/i)).toBeInTheDocument();
    });
});

describe('StudentTable — row highlighting', () => {
    it('adds high-gpa class only to rows with gpa >= 3.5', async () => {
        renderWithStore(<StudentTable />);
        await screen.findByText('Alice Smith');
        const highlighted = document.querySelectorAll('tr.high-gpa');
        expect(highlighted).toHaveLength(1);
        expect(highlighted[0]).toHaveTextContent('Alice Smith');
    });
});

describe('StudentTable — action buttons', () => {
    it('renders Edit and Delete buttons for each student', async () => {
        renderWithStore(<StudentTable />);
        await screen.findByText('Alice Smith');
        expect(screen.getAllByRole('button', { name: /edit/i })).toHaveLength(mockStudents.length);
        expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(mockStudents.length);
    });

    it('calls onEditStudent with the correct student when Edit is clicked', async () => {
        const onEditStudent = vi.fn();
        renderWithStore(<StudentTable onEditStudent={onEditStudent} />);
        await screen.findByText('Alice Smith');
        await userEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);
        expect(onEditStudent).toHaveBeenCalledWith(mockStudents[0]);
    });

    it('calls onDeleteStudent with the correct id when Delete is clicked', async () => {
        const onDeleteStudent = vi.fn();
        renderWithStore(<StudentTable onDeleteStudent={onDeleteStudent} />);
        await screen.findByText('Alice Smith');
        await userEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
        expect(onDeleteStudent).toHaveBeenCalledWith(mockStudents[0].id);
    });
});
