import { getStudents } from '@controllers';
import { Router } from 'express';

export const studentRoutes = (router: Router) => {
    router.get('/students', getStudents);
};
