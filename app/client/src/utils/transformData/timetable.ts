import { StudentTimetable } from '@sis/types';

export const getTimetableTableData = (timetable: StudentTimetable) => {
    const formattedData = Object.entries(timetable.timetable);

    return { days: formattedData, details: timetable.timetableDetails };
};
