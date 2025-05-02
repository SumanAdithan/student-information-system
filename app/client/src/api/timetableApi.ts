import { api } from './apiClient';

export const getAuthenticatedStudentTimetable = async () => {
    const { data } = await api.get('/student/timetable');

    return {
        timetable: data.data,
    };
};

export const getAllStudentTimetable = async () => {
    const { data } = await api.get('/student/timetables');

    return {
        timetables: data.data,
    };
};

export const updateStudentTimetable = async ({ year, updatedTimetable }: { year: number; updatedTimetable: any }) => {
    const timetable = {
        timetable: updatedTimetable,
    };

    const { data } = await api.patch(`/student/timetable/${year}`, timetable);

    return {
        timetable: data.data,
    };
};

export const updateStudentTimetableDetails = async ({
    year,
    updatedTimetableDetails,
}: {
    year: number;
    updatedTimetableDetails: any;
}) => {
    const timetable = {
        timetableDetails: updatedTimetableDetails,
    };

    const { data } = await api.patch(`/student/timetable/${year}`, timetable);

    return {
        timetable: data.data,
    };
};
