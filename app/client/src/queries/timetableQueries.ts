import {
    getAllStudentTimetable,
    getAuthenticatedStudentTimetable,
    updateStudentTimetable,
    updateStudentTimetableDetails,
} from '@api';
import { setTimetable } from '@store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useGetAuthenticatedStudentTimetable = () => {
    return useQuery({
        queryKey: ['authenticatedTimetable'],
        queryFn: getAuthenticatedStudentTimetable,
    });
};

export const useGetAllStudentTimetable = () => {
    return useQuery({
        queryKey: ['allStudentTimetable'],
        queryFn: getAllStudentTimetable,
    });
};

export const useTimetableMutations = () => {
    const dispatch = useDispatch();

    const updateStudentTimetableMutation = useMutation({
        mutationFn: updateStudentTimetable,
        onSuccess: ({ timetable }) => {
            dispatch(setTimetable(timetable));
        },
    });

    const updateStudentTimetableDetailsMutation = useMutation({
        mutationFn: updateStudentTimetableDetails,
        onSuccess: ({ timetable }) => {
            dispatch(setTimetable(timetable));
        },
    });

    return { updateStudentTimetableMutation, updateStudentTimetableDetailsMutation };
};
