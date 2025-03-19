import { attendance, cgpa, dues, profile } from '@assets';

export const getStudentOverviewData = (data: any) => {
    const overviewStat = [
        { name: 'CGPA', icon: cgpa, value: data.cgpa.toString() },
        { name: 'Attendance', icon: attendance, value: data.attendance.toString() },
        { name: 'Dues', icon: dues, value: data.dues.toString() },
    ];

    const overviewProfile = {
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        regNo: data.registerNo,
        profileImage: data.profileImage ? data.profileImage : profile,
    };

    const yearMapping = { 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth' };
    let overviewDetails: Record<string, any> = {
        dob: data.dob,
        arrears: data.arrears,
        gender: data.gender,
        degree: data.degree,
        department: data.department,
        email: data.email,
        year: yearMapping[data.year as keyof typeof yearMapping],
        sem: data.semester,
        mobile: data.mobile,
        batch: data.batch,
        accomodation: data.accomodation,
    };

    overviewDetails = Object.entries(overviewDetails).reduce((acc, [key, value]) => {
        if (key === 'year') {
            acc.push(['Year/Sem', `${value}/${overviewDetails.sem}`]);
        } else if (key !== 'sem') {
            let formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            if (key === 'dob') {
                formattedKey = key.toUpperCase();
            }
            acc.push([formattedKey, value]);
        }
        return acc;
    }, [] as Record<string, any>);

    const studentOverviewConfig = {
        overviewProfile,
        overviewStat,
        overviewDetails,
    };
    return studentOverviewConfig;
};
