import {
    createAssignmentData,
    createDues,
    createInternalResultData,
    createSemesterResultData,
    deleteStudentById,
    getRegulationDetails,
} from '@models';
import { AssignmentResult, InternalResult, SemesterResult, Semesters, StudentWithId, Subject } from '@sis/types';
import { getNumberToWord } from '@utils';

interface InitialState {
    name: string;
    registerNo: number;
    year: number;
    results: Record<string, any>;
}

export class AssignDefaults {
    async assignStudentDefaults(student: StudentWithId) {
        try {
            const { registerNo, name, year, regulation, semester } = student;
            const semesterWord = getNumberToWord(semester);

            const regulationInfo = await getRegulationDetails(regulation);
            const { subjects } = regulationInfo.semesters[semesterWord as keyof Semesters];

            const initialState: InitialState = { name, year, registerNo, results: {} };

            const assignmentResult = this.assignments(initialState, subjects);
            const internalResult = this.internalResults(initialState, subjects);
            const semesterResult = this.semesterResults(initialState, regulationInfo.semesters as Semesters);

            await createAssignmentData(assignmentResult as AssignmentResult);
            await createInternalResultData(internalResult as InternalResult);
            await createSemesterResultData(semesterResult as SemesterResult);
            await createDues(name, year, registerNo);
            return {
                success: true,
            };
        } catch (err) {
            return {
                success: false,
            };
        }
    }

    private assignments(initialState: InitialState, subjects: Subject[]) {
        const assignment = ['one', 'two', 'three'];
        return assignment.reduce(
            (acc, key) => {
                acc.results[key] = subjects;
                return acc;
            },
            { ...initialState, results: {} as Record<string, Subject[]> }
        );
    }

    private internalResults(initialState: InitialState, subjects: Subject[]) {
        const internal = ['one', 'two', 'three', 'four'];
        return internal.reduce(
            (acc, key) => {
                acc.results[key] = subjects;
                return acc;
            },
            { ...initialState, results: {} as Record<string, Subject[]> }
        );
    }

    private semesterResults(initialState: InitialState, semesters: Semesters) {
        return Object.entries(semesters).reduce(
            (acc, [key, val]) => {
                acc.results[key] = [...val.subjects, ...val.laboratory];
                return acc;
            },
            { ...initialState, results: {} as Record<string, Subject[]> }
        );
    }
}
