import { AssignmentResult } from '@sis/types';

export const getAssignmentTableData = (assignments: AssignmentResult[]) => {
    return assignments.flatMap((student) =>
        Object.entries(student.results).flatMap(([semester, subjects]) =>
            subjects.map((subject) => ({
                registerNo: student.registerNo,
                name: student.name,
                semester,
                subject: subject.name,
                code: subject.code,
                status: subject.status,
                mark: subject.mark,
            }))
        )
    );
};
