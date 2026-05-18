const fs = require('fs');

const allStudents = {
    1: [
        { name: 'Jane Brown', registerNo: 961361104001 },
        { name: 'Emily Clark', registerNo: 961361104002 },
        { name: 'Katie Johnson', registerNo: 961361104003 },
        { name: 'Emily Taylor', registerNo: 961361104004 },
        { name: 'Emily Walker', registerNo: 961361104005 },
        { name: 'John Allen', registerNo: 961361104006 },
        { name: 'David Walker', registerNo: 961361104007 },
        { name: 'Jane Young', registerNo: 961361104008 },
        { name: 'David Martin', registerNo: 961361104009 },
        { name: 'John Johnson', registerNo: 961361104010 },
    ],
    2: [
        { name: 'Chris Lee', registerNo: 961351104001 },
        { name: 'John Young', registerNo: 961351104002 },
        { name: 'Alex Clark', registerNo: 961351104003 },
        { name: 'Daniel Martin', registerNo: 961351104004 },
        { name: 'Chris Allen', registerNo: 961351104005 },
        { name: 'Laura Johnson', registerNo: 961351104006 },
        { name: 'Katie Allen', registerNo: 961351104007 },
        { name: 'Alex Young', registerNo: 961351104008 },
        { name: 'Katie Martin', registerNo: 961351104009 },
        { name: 'Katie Clark', registerNo: 961351104010 },
    ],
    3: [
        { name: 'John Martin', registerNo: 961341104001 },
        { name: 'Jane Clark', registerNo: 961341104002 },
        { name: 'David Brown', registerNo: 961341104003 },
        { name: 'Emily Brown', registerNo: 961341104004 },
        { name: 'Sara Martin', registerNo: 961341104005 },
        { name: 'Laura Young', registerNo: 961341104006 },
        { name: 'Laura Walker', registerNo: 961341104007 },
        { name: 'Emily Johnson', registerNo: 961341104008 },
        { name: 'Alex Brown', registerNo: 961341104009 },
        { name: 'Laura Allen', registerNo: 961341104010 },
    ],
    4: [
        { name: 'Katie Taylor', registerNo: 961321104001 },
        { name: 'Chris Brown', registerNo: 961321104002 },
        { name: 'Daniel Allen', registerNo: 961321104003 },
        { name: 'Daniel Young', registerNo: 961321104004 },
        { name: 'Daniel Taylor', registerNo: 961321104005 },
        { name: 'Alex Johnson', registerNo: 961321104006 },
        { name: 'Sara Lee', registerNo: 961321104007 },
        { name: 'Chris Smith', registerNo: 961321104008 },
        { name: 'Jane Taylor', registerNo: 961321104009 },
        { name: 'Jane Walker', registerNo: 961321104010 },
    ],
};

const allSubjects = {
    1: [
        { code: 'HS3152', name: 'Professional English - I' },
        { code: 'MA3151', name: 'Matrices and Calculus' },
        { code: 'PH3151', name: 'Engineering Physics' },
        { code: 'CY3151', name: 'Engineering Chemistry' },
        { code: 'GE3151', name: 'Problem Solving and Python Programming' },
        { code: 'GE3171', name: 'Problem Solving and Python Programming Laboratory' },
        { code: 'BS3171', name: 'Physics and Chemistry Laboratory' },
        { code: 'GE3172', name: 'English Laboratory' },
    ],
    2: [
        { code: 'HS3252', name: 'Professional English - II' },
        { code: 'MA3251', name: 'Statistics and Numerical Methods' },
        { code: 'PH3256', name: 'Physics for Information Science' },
        { code: 'BE3251', name: 'Basic Electrical and Electronics Engineering' },
        { code: 'EG3251', name: 'Engineering Graphics' },
        { code: 'CS3251', name: 'Programming in C' },
        { code: 'GE3271', name: 'Engineering Practices Laboratory' },
        { code: 'CS3271', name: 'Programming in C Laboratory' },
        { code: 'GE3272', name: 'Communication Laboratory' },
    ],
    3: [
        { code: 'MA3354', name: 'Discrete Mathematics' },
        { code: 'CS3351', name: 'Digital Principles and Computer Organization' },
        { code: 'CS3352', name: 'Foundations of Data Science' },
        { code: 'CD3291', name: 'Data Structures and Algorithms' },
        { code: 'CS3391', name: 'Object Oriented Programming' },
        { code: 'CD3281', name: 'Data Structures and Algorithms Laboratory' },
        { code: 'CS3381', name: 'Object Oriented Programming Laboratory' },
        { code: 'CS3361', name: 'Data Science Laboratory' },
    ],
    4: [
        { code: 'CS3452', name: 'Theory of Computation' },
        { code: 'AL3452', name: 'Operating Systems' },
        { code: 'AD3391', name: 'Database Design and Management' },
        { code: 'AL3451', name: 'Machine Learning' },
        { code: 'AL3391', name: 'Artificial Intelligence' },
        { code: 'GE3451', name: 'Environmental Sciences and Sustainability' },
        { code: 'AL3411', name: 'Artificial Intelligence & Machine Learning Laboratory' },
        { code: 'AD3381', name: 'Database Design and Management Laboratory' },
    ],
    5: [
        { code: 'AL3501', name: 'Natural Language Processing' },
        { code: 'AL3502', name: 'Deep Learning for Vision' },
        { code: 'CB3491', name: 'Cryptography and Cyber Security' },
        { code: 'CS3551', name: 'Distributed Computing' },
    ],
    6: [
        { code: 'CCS356', name: 'Object Oriented Software Engineering' },
        { code: 'CS3691', name: 'Embedded Systems and IoT' },
        { code: 'CCS346', name: 'Exploratory Data Analysis' },
        { code: 'CCS375', name: 'Web Technologies' },
    ],
    7: [
        { code: 'GE3791', name: 'Human Values and Ethics' },
        { code: 'CCS335', name: 'Cloud Computing' },
        { code: 'CCS344', name: 'Ethical Hacking' },
    ],
    8: [{ code: 'AL3811', name: 'Project Work/Internship' }],
};

const GRADE_LIST = ['UA', 'U', 'C', 'B', 'B+', 'A', 'A+', 'O'];

const generateSemesterResults = (subjects, shouldGenerate) => {
    return subjects.map((subj, idx) => {
        if (!shouldGenerate) {
            return {
                ...subj,
                grade: '-',
                status: false,
            };
        }

        const grade = GRADE_LIST[Math.floor(Math.random() * GRADE_LIST.length)];
        const status = !['UA', 'U'].includes(grade); // Failed grades

        return {
            ...subj,
            grade,
            status,
        };
    });
};

const fullResults = [];

for (const year in allStudents) {
    const students = allStudents[year];

    students.forEach(({ name, registerNo }) => {
        const result = {};
        for (let sem = 1; sem <= 8; sem++) {
            const subjectList = allSubjects[sem] || [];
            const shouldGenerate = sem <= Number(year) + (Number(year) - 1); // sem limit: 1st year - 1, 2nd - 3, 3rd - 5, 4th - 7
            result[semToWord(sem)] = generateSemesterResults(subjectList, shouldGenerate);
        }

        fullResults.push({
            registerNo,
            name,
            year: Number(year),
            results: result,
        });
    });
}

fs.writeFileSync('results.json', JSON.stringify(fullResults, null, 2));
console.log('All year results saved to results.json');

function semToWord(sem) {
    const map = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
    };
    return map[sem];
}

// const generateSemesterResults = (subjects) => {
//     return subjects.map((subj) => {
//         const mark = Math.random() > 0.3 ? Math.floor(Math.random() * 101) : 0;
//         // ramdom should these grade [ 'UA', 'U', 'C', 'B', 'B+', 'A', 'A+', 'O'] not number and mark
//         return {
//             ...subj,
//             mark,
//             status: mark >= 50,
//         };
//     });
// };

// const fullResults = [];

// for (const year in allStudents) {
//     const students = allStudents[year];
//     const subjects = allSubjects[year];

//     students.forEach(({ name, registerNo }) => {
//         fullResults.push({
//             registerNo,
//             name,
//             year: Number(year),
//             results: {
//                 one: generateSemesterResults(subjects),
//                 two: generateSemesterResults(subjects),
//                 three: generateSemesterResults(subjects),
//                 four: generateSemesterResults(subjects),
//                 five: generateSemesterResults(subjects),
//                 six: generateSemesterResults(subjects),
//                 seven: generateSemesterResults(subjects),
//                 eight: generateSemesterResults(subjects),
//             },
//         });
//     });
// }

// fs.writeFileSync('results.json', JSON.stringify(fullResults, null, 2));
// console.log('All year results saved to results.json');

// for year 1 - should enter first index of all subjects results,
// for year 2 - should enter first,second,third index of all subjects results,
// for year 3 - should enter first,second,third,fourth,fifth index of all subjects results,
// for year 4 - should enter first,second,third,fourth,fifth,sixth,seventh index of all subjects results,

// for non entry results assign grade: '-'

// allStudents= {
// 1:[{...}],
// 2:[],
// 3:[],
// 4:[],
// }
// allSubjects= {
// 1:[{...}],
// 2:[],
// 3:[],
// 4:[],
// 5:[],
// 6:[],
// 7:[],
// 8:[],
// }
