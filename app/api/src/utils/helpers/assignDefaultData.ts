import {
    createAssignmentResult,
    createDues,
    createInternalResult,
    createSemesterResult,
    findRegulationInfo,
} from '@models';
import { AssignmentResult, InternalResult, SemesterResult, Semesters, Student } from '@sis/types';

export const assignDefaultData = async (students: Student[]) => {
    await Promise.all(
        students.map(async (student: Student) => {
            try {
                const { registerNo, name, regulation, semesterWord } = student;
                const regulationInfo = await findRegulationInfo(regulation);
                const { subjects } = regulationInfo.semesters[semesterWord as keyof Semesters];
                const initialState = {
                    name,
                    registerNo,
                };

                const assignment = ['one', 'two', 'three'];
                const assignmentResult = assignment.reduce(
                    (acc, key) => {
                        acc.results[key] = subjects;
                        return acc;
                    },
                    { ...initialState, results: {} as Record<string, any> }
                );

                const internal = [...assignment, 'semester'];
                const internalResult = internal.reduce(
                    (acc, key) => {
                        acc.results[key] = subjects;
                        return acc;
                    },
                    { ...initialState, results: {} as Record<string, any> }
                );

                const semesterResult = Object.entries(regulationInfo.semesters).reduce(
                    (acc, [key, val]) => {
                        acc.results[key] = [...val.subjects, ...val.laboratory];
                        return acc;
                    },
                    { ...initialState, results: {} as Record<string, any> }
                );

                await createAssignmentResult(assignmentResult as AssignmentResult);
                await createInternalResult(internalResult as InternalResult);
                await createSemesterResult(semesterResult as SemesterResult);
                await createDues(initialState);

                return;
            } catch (err) {
                console.error(`Failed to add assignment ${err}`);
            }
        })
    );
};
