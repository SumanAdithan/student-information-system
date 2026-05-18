// timetable
const year1 = {
    year: 1,
    timetable: {
        monday: {
            one: 'MA3151',
            two: 'HS3152',
            three: 'GE3171',
            four: 'GE3171',
            five: 'PH3151',
            six: 'CY3151',
        },
        tuesday: {
            one: 'BS3171',
            two: 'BS3171',
            three: 'GE3151',
            four: 'CY3151',
            five: 'HS3152',
            six: 'PH3151',
        },
        wednesday: {
            one: 'MA3151',
            two: 'GE3172',
            three: 'GE3172',
            four: 'GE3151',
            five: 'CY3151',
            six: 'PH3151',
        },
        thursday: {
            one: 'HS3152',
            two: 'GE3171',
            three: 'GE3171',
            four: 'GE3151',
            five: 'MA3151',
            six: 'CY3151',
        },
        friday: {
            one: 'BS3171',
            two: 'BS3171',
            three: 'GE3151',
            four: 'GE3172',
            five: 'GE3172',
            six: 'MA3151',
        },
    },
    timetableDetails: [
        {
            subjectName: 'Professional English - I',
            code: 'HS3152',
            staff: 'Dr. Anitha',
        },
        {
            subjectName: 'Matrices and Calculus',
            code: 'MA3151',
            staff: 'Mr. Kumar',
        },
        {
            subjectName: 'Engineering Physics',
            code: 'PH3151',
            staff: 'Dr. Ravi',
        },
        {
            subjectName: 'Engineering Chemistry',
            code: 'CY3151',
            staff: 'Ms. Priya',
        },
        {
            subjectName: 'Problem Solving and Python Programming',
            code: 'GE3151',
            staff: 'Mr. Suresh',
        },
        {
            subjectName: 'Problem Solving and Python Programming Laboratory',
            code: 'GE3171',
            staff: 'Mr. Suresh',
        },
        {
            subjectName: 'Physics and Chemistry Laboratory',
            code: 'BS3171',
            staff: 'Dr. Ravi & Ms. Priya',
        },
        {
            subjectName: 'English Laboratory',
            code: 'GE3172',
            staff: 'Dr. Anitha',
        },
    ],
    __v: 0,
};
const year2 = {
    year: 2,
    timetable: {
        monday: {
            one: 'MA3354',
            two: 'CS3351',
            three: 'CS3381',
            four: 'CS3381',
            five: 'CS3352',
            six: 'CD3291',
        },
        tuesday: {
            one: 'CD3281',
            two: 'CD3281',
            three: 'CS3351',
            four: 'MA3354',
            five: 'CS3391',
            six: 'CS3352',
        },
        wednesday: {
            one: 'CS3352',
            two: 'CS3361',
            three: 'CS3361',
            four: 'CD3291',
            five: 'CS3351',
            six: 'MA3354',
        },
        thursday: {
            one: 'CS3391',
            two: 'CD3291',
            three: 'CS3351',
            four: 'CS3381',
            five: 'CS3381',
            six: 'MA3354',
        },
        friday: {
            one: 'CS3361',
            two: 'CS3361',
            three: 'CD3281',
            four: 'CD3281',
            five: 'CS3391',
            six: 'CS3352',
        },
    },
    timetableDetails: [
        {
            subjectName: 'Discrete Mathematics',
            code: 'MA3354',
            staff: 'Dr. Karthik',
            _id: {
                $oid: '6803e1de24f2ca148c4da1c3',
            },
        },
        {
            subjectName: 'Digital Principles and Computer Organization',
            code: 'CS3351',
            staff: 'Mr. Rajesh',
            _id: {
                $oid: '6803e1de24f2ca148c4da1c4',
            },
        },
        {
            subjectName: 'Foundations of Data Science',
            code: 'CS3352',
            staff: 'Ms. Meena',
            _id: {
                $oid: '6803e1de24f2ca148c4da1c5',
            },
        },
        {
            subjectName: 'Data Structures and Algorithms',
            code: 'CD3291',
            staff: 'Mr. Arvind',
            _id: {
                $oid: '6803e1de24f2ca148c4da1c6',
            },
        },
        {
            subjectName: 'Object Oriented Programming',
            code: 'CS3391',
            staff: 'Dr. Sneha',
        },
        {
            subjectName: 'Data Structures and Algorithms Laboratory',
            code: 'CD3281',
            staff: 'Mr. Arvind',
        },
        {
            subjectName: 'Object Oriented Programming Laboratory',
            code: 'CS3381',
            staff: 'Dr. Sneha',
        },
        {
            subjectName: 'Data Science Laboratory',
            code: 'CS3361',
            staff: 'Ms. Meena',
        },
    ],
};
const year3 = {
    year: 3,
    timetable: {
        monday: {
            one: 'AL3501',
            two: 'CB3491',
            three: 'CS3551',
            four: 'AL3502',
            five: 'AL3501',
            six: 'CB3491',
        },
        tuesday: {
            one: 'AL3502',
            two: 'CS3551',
            three: 'CB3491',
            four: 'AL3501',
            five: 'CS3551',
            six: 'AL3502',
        },
        wednesday: {
            one: 'CB3491',
            two: 'AL3502',
            three: 'CS3551',
            four: 'AL3501',
            five: 'CB3491',
            six: 'AL3502',
        },
        thursday: {
            one: 'CS3551',
            two: 'AL3501',
            three: 'AL3502',
            four: 'CB3491',
            five: 'CS3551',
            six: 'AL3501',
        },
        friday: {
            one: 'AL3502',
            two: 'CB3491',
            three: 'CS3551',
            four: 'AL3501',
            five: 'CB3491',
            six: 'CS3551',
        },
    },
    timetableDetails: [
        {
            subjectName: 'Natural Language Processing',
            code: 'AL3501',
            staff: 'Dr. Kavitha',
        },
        {
            subjectName: 'Deep Learning for Vision',
            code: 'AL3502',
            staff: 'Dr. Naren',
        },
        {
            subjectName: 'Cryptography and Cyber Security',
            code: 'CB3491',
            staff: 'Ms. Swetha',
        },
        {
            subjectName: 'Distributed Computing',
            code: 'CS3551',
            staff: 'Mr. Ajay',
        },
    ],
};
const year4 = {
    year: 4,
    timetable: {
        monday: {
            one: 'CCS335',
            two: '-',
            three: 'GE3791',
            four: '-',
            five: 'CCS344',
            six: '-',
        },
        tuesday: {
            one: '-',
            two: 'GE3791',
            three: 'CCS344',
            four: '-',
            five: 'CCS335',
            six: '-',
        },
        wednesday: {
            one: 'CCS344',
            two: 'CCS335',
            three: '-',
            four: 'GE3791',
            five: '-',
            six: '-',
        },
        thursday: {
            one: '-',
            two: 'CCS335',
            three: 'CCS344',
            four: '-',
            five: 'GE3791',
            six: '-',
        },
        friday: {
            one: 'GE3791',
            two: '-',
            three: 'CCS335',
            four: 'CCS344',
            five: '-',
            six: '-',
        },
    },
    timetableDetails: [
        {
            subjectName: 'Human Values and Ethics',
            code: 'GE3791',
            staff: 'Dr. Ramesh',
        },
        {
            subjectName: 'Cloud Computing',
            code: 'CCS335',
            staff: 'Mr. Varun',
        },
        {
            subjectName: 'Ethical Hacking',
            code: 'CCS344',
            staff: 'Ms. Neha',
        },
    ],
};

const result = [
    {
        name: 'aa', //assign from timetable
        email: 'aa@gmail.com', //assign from timetable
        position: 'Professor',
        total_subjects: 11, //calculate total Subjects
        total_classes: 'aa', //if teacher assigned to teach 1st year, and 2nd year it should be "I, II"
        //assign subjects from timetable
        subjects: [
            {
                subjectName: 'aa',
                code: 'aa',
                year: 'aa',
            },
            {
                subjectName: 'bb',
                code: 'bb',
                year: 'bb',
            },
        ],
    },
];

// create nodejs code to generate json file

const fs = require('fs');

const years = [year1, year2, year3, year4];

const staffMap = new Map();

for (const yearData of years) {
    const { year, timetableDetails, timetable } = yearData;

    // Collect staff and subjects they teach
    for (const detail of timetableDetails) {
        const staffNames = detail.staff.split('&').map((name) => name.trim());
        for (const staff of staffNames) {
            if (!staffMap.has(staff)) {
                staffMap.set(staff, {
                    name: staff,
                    email: `${staff.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
                    position: 'Professor',
                    subjects: [],
                    years: new Set(),
                });
            }

            const staffInfo = staffMap.get(staff);
            staffInfo.subjects.push({
                subjectName: detail.subjectName,
                code: detail.code,
                year: `I`.repeat(year),
            });
            staffInfo.years.add(year);
        }
    }
}

// Final output
const output = Array.from(staffMap.values()).map((staff) => ({
    name: staff.name,
    email: staff.email,
    position: staff.position,
    total_subjects: staff.subjects.length,
    total_classes: Array.from(staff.years)
        .sort()
        .map((y) => ['I', 'II', 'III', 'IV'][y - 1])
        .join(', '),
    subjects: staff.subjects,
}));

// Save as JSON file
fs.writeFileSync('staff_summary.json', JSON.stringify(output, null, 2));
console.log('staff_summary.json has been created.');
