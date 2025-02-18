import { deleteStudent, getStudents, newStudent, updateStudent } from '@controllers';
import { Router } from 'express';

export const studentRoutes = (router: Router) => {
    router.get('/students', getStudents);
    router.post('/student/new', newStudent);
    router.patch('/student/:id', updateStudent);
    router.delete('/student/:id', deleteStudent);
};
