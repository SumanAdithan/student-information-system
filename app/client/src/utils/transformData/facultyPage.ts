import { classes, role, subject } from '@assets';
import { Faculty } from '@sis/types';

export const getFacultyOverviewData = (data: Faculty) => {
    const overviewStat = [
        { name: 'Subjects', icon: subject, value: data.total_subjects.toString() },
        { name: 'Classes', icon: classes, value: data.total_classes.toString() },
        { name: 'Role', icon: role, value: data.position.toString() },
    ];

    const subjectDetails = data.subjects ? data.subjects : [];

    return { overviewStat, subjectDetails };
};
