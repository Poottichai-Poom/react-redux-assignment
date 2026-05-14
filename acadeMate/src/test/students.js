import { http, HttpResponse } from 'msw';

export const mockStudents = [
    { id: 1, name: 'Alice Smith', studentId: '6501001', major: 'Computer Science', gpa: 3.8 },
    { id: 2, name: 'Bob Jones',   studentId: '6501002', major: 'Information Technology', gpa: 2.9 },
];

export const studentHandlers = [
    http.get('http://localhost:3000/students', () =>
        HttpResponse.json(mockStudents)
    ),

    http.get('http://localhost:3000/students/:id', ({ params }) => {
        const student = mockStudents.find((s) => s.id === Number(params.id));
        if (!student) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
        return HttpResponse.json(student);
    }),

    http.post('http://localhost:3000/students', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ id: 99, ...body }, { status: 201 });
    }),

    http.put('http://localhost:3000/students/:id', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json(body);
    }),

    http.delete('http://localhost:3000/students/:id', () =>
        HttpResponse.json({})
    ),
];
