import { StudentTimetable } from '@sis/types';

export const getTimetableTableData = (timetable: StudentTimetable) => {
    const formattedData = Object.entries(timetable).map(([day, periods]) => ({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        p1: periods.one,
        break: '',
        p2: periods.two,
        p3: periods.three,
        lunch: '',
        p4: periods.four,
        p5: periods.five,
        p6: periods.six,
    }));

    return { timetable: formattedData };
};
