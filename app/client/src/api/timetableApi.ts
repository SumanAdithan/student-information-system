import { api } from './apiClient';

export const getAuthenticatedStudentTimetable = async () => {
    const { data } = await api.get('/student/timetable');

    return {
        timetable: data.data,
    };
};
