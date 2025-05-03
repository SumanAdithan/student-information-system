import { Router } from 'express';
import { studentRoutes } from './student.routes';
import { assignmentRoutes } from './assignment.routes';
import { fileRoutes } from './file.routes';
import { authRoutes } from './auth.routes';
import { internalResultRoutes } from './internalResult.routes';
import { semesterResultRoutes } from './semesterResult.routes';
import { duesRoutes } from './dues.routes';
import { paymentRoutes } from './paymentRoutes';
import { notesRoutes } from './notes.routes';
import { studentTimetableRoutes } from './studentTimetable.routes';
import { circularRoutes } from './circular.routes';
import { eventRoutes } from './event.routes';
import { duesAndApprovalsRoutes } from './duesAndApprovals.routes';
import { facultyRoutes } from './faculty.routes';

const router = Router();

export default (): Router => {
    authRoutes(router);
    studentRoutes(router);
    assignmentRoutes(router);
    internalResultRoutes(router);
    semesterResultRoutes(router);
    notesRoutes(router);
    duesRoutes(router);
    studentTimetableRoutes(router);
    circularRoutes(router);
    eventRoutes(router);
    duesAndApprovalsRoutes(router);
    fileRoutes(router);
    paymentRoutes(router);
    facultyRoutes(router);
    return router;
};
