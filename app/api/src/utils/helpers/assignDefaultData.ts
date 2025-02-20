import { addInternalMarkData, addSemesterResultData } from '@models';
import { Assignment, InternalMark, SemesterGrade, SemesterResult, Semesters, Student } from '@sis/types';
import { addAssignmentData } from 'models/assignmentModel';
import { findRegulationInfo } from 'models/regulationInfoModel';

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

                await addAssignmentData([assignmentResult as Assignment]);
                await addInternalMarkData([internalResult as InternalMark]);
                await addSemesterResultData([semesterResult as SemesterGrade]);
               

                return;
            } catch (err) {
                console.error(`Failed to add assignment ${err}`);
            }
        })
    );
};