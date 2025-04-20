import { getAuthenticatedStudentTimetable } from '@api';
import { useQuery } from '@tanstack/react-query';

export const useGetAuthenticatedStudentTimetable = () => {
    return useQuery({
        queryKey: ['authenticatedTimetable'],
        queryFn: getAuthenticatedStudentTimetable,
    });
};
