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
    ],
    2: [
        { code: 'MA3354', name: 'Discrete Mathematics' },
        { code: 'CS3351', name: 'Digital Principles and Computer Organization' },
        { code: 'CS3352', name: 'Foundations of Data Science' },
        { code: 'CD3291', name: 'Data Structures and Algorithms' },
        { code: 'CS3391', name: 'Object Oriented Programming' },
    ],
    3: [
        { code: 'AL3501', name: 'Natural Language Processing' },
        { code: 'AL3502', name: 'Deep Learning for Vision' },
        { code: 'CB3491', name: 'Cryptography and Cyber Security' },
        { code: 'CS3551', name: 'Distributed Computing' },
    ],
    4: [
        { code: 'GE3791', name: 'Human Values and Ethics' },
        { code: 'CCS335', name: 'Cloud Computing' },
        { code: 'CCS344', name: 'Ethical Hacking' },
    ],
};

const generateInternalResults = (subjects) => {
    return subjects.map((subj) => {
        const mark = Math.random() > 0.3 ? Math.floor(Math.random() * 101) : 0; // 0 or 1-10
        return {
            ...subj,
            mark,
            status: mark >= 50,
        };
    });
};

const fullResults = [];

for (const year in allStudents) {
    const students = allStudents[year];
    const subjects = allSubjects[year];

    students.forEach(({ name, registerNo }) => {
        fullResults.push({
            registerNo,
            name,
            year: Number(year),
            results: {
                one: generateInternalResults(subjects),
                two: generateInternalResults(subjects),
                three: generateInternalResults(subjects),
                four: generateInternalResults(subjects),
            },
        });
    });
}

fs.writeFileSync('results.json', JSON.stringify(fullResults, null, 2));
console.log('All year results saved to results.json');
