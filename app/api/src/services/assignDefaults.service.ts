import {
    createAssignmentData,
    // createDues,
    createInternalResultData,
    createSemesterResult,
    getRegulationDetails,
} from '@models';
import { AssignmentResult, InternalResult, SemesterResult, Semesters, Student, Subject } from '@sis/types';
import { getNumberToWord } from '@utils';

interface InitialState {
    name: string;
    registerNo: number;
    year: number;
    results: Record<string, any>;
}

export class AssignDefaults {
    async assignStudentDefaults(students: Student[]) {
        await Promise.all(
            students.map(async (student: Student) => {
                try {
                    const { registerNo, name, year, regulation, semester } = student;
                    const semesterWord = getNumberToWord(semester);

                    const regulationInfo = await getRegulationDetails(regulation);
                    const { subjects, laboratory } = regulationInfo.semesters[semesterWord as keyof Semesters];

                    const initialState: InitialState = { name, year, registerNo, results: {} };

                    const assignmentResult = this.assignments(initialState, subjects);
                    const internalResult = this.internalResults(initialState, subjects);
                    const semesterResult = this.semesterResults(initialState, regulationInfo.semesters as Semesters);

                    await createAssignmentData(assignmentResult as AssignmentResult);
                    await createInternalResultData(internalResult as InternalResult);
                    // await createSemesterResult(semesterResult as SemesterResult);
                    // await createDues(initialState);
                } catch (err) {
                    console.error(`Failed to assign default data: ${err}`);
                }
            })
        );
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
