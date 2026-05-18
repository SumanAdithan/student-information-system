const fs = require('fs');

const allStudents = {
    1: [
        { name: 'Jane Brown', registerNo: 961361104001, dues: 20000 },
        { name: 'Emily Clark', registerNo: 961361104002, dues: 20000 },
        { name: 'Katie Johnson', registerNo: 961361104003, dues: 20000 },
        { name: 'Emily Taylor', registerNo: 961361104004, dues: 20000 },
        { name: 'Emily Walker', registerNo: 961361104005, dues: 20000 },
        { name: 'John Allen', registerNo: 961361104006, dues: 25000 },
        { name: 'David Walker', registerNo: 961361104007, dues: 25000 },
        { name: 'Jane Young', registerNo: 961361104008, dues: 25000 },
        { name: 'David Martin', registerNo: 961361104009, dues: 25000 },
        { name: 'John Johnson', registerNo: 961361104010, dues: 25000 },
    ],
    2: [
        { name: 'Chris Lee', registerNo: 961351104001, dues: 10000 },
        { name: 'John Young', registerNo: 961351104002, dues: 10000 },
        { name: 'Alex Clark', registerNo: 961351104003, dues: 10000 },
        { name: 'Daniel Martin', registerNo: 961351104004, dues: 10000 },
        { name: 'Chris Allen', registerNo: 961351104005, dues: 10000 },
        { name: 'Laura Johnson', registerNo: 961351104006, dues: 10000 },
        { name: 'Katie Allen', registerNo: 961351104007, dues: 0 },
        { name: 'Alex Young', registerNo: 961351104008, dues: 0 },
        { name: 'Katie Martin', registerNo: 961351104009, dues: 30000 },
        { name: 'Katie Clark', registerNo: 961351104010, dues: 30000 },
    ],
    3: [
        { name: 'John Martin', registerNo: 961341104001, dues: 0 },
        { name: 'Jane Clark', registerNo: 961341104002, dues: 0 },
        { name: 'David Brown', registerNo: 961341104003, dues: 15000 },
        { name: 'Emily Brown', registerNo: 961341104004, dues: 25000 },
        { name: 'Sara Martin', registerNo: 961341104005, dues: 30000 },
        { name: 'Laura Young', registerNo: 961341104006, dues: 10000 },
        { name: 'Laura Walker', registerNo: 961341104007, dues: 10000 },
        { name: 'Emily Johnson', registerNo: 961341104008, dues: 10000 },
        { name: 'Alex Brown', registerNo: 961341104009, dues: 0 },
        { name: 'Laura Allen', registerNo: 961341104010, dues: 0 },
    ],
    4: [
        { name: 'Katie Taylor', registerNo: 961321104001, dues: 20000 },
        { name: 'Chris Brown', registerNo: 961321104002, dues: 20000 },
        { name: 'Daniel Allen', registerNo: 961321104003, dues: 20000 },
        { name: 'Daniel Young', registerNo: 961321104004, dues: 20000 },
        { name: 'Daniel Taylor', registerNo: 961321104005, dues: 0 },
        { name: 'Alex Johnson', registerNo: 961321104006, dues: 0 },
        { name: 'Sara Lee', registerNo: 961321104007, dues: 30000 },
        { name: 'Chris Smith', registerNo: 961321104008, dues: 30000 },
        { name: 'Jane Taylor', registerNo: 961321104009, dues: 5000 },
        { name: 'Jane Walker', registerNo: 961321104010, dues: 5000 },
    ],
};

const output = {
    name: 'aaa',
    registerNo: 1234567890,
    course: 'B.E',
    branch: 'Computer Science Engineering',
    year: 1,
    isPartialPaid: false, //total fees is 45000, compare total and pending if pending >=50% true otherwise false
    semester: 1,
    pending: 10001, //assign from student data dues
    approvals: {
        accountant: true, // it isPartialPaid false it false otherwise it true
        librarian: true, //static
        head_of_department: true, //static
        administrative_officer: true, //static
        principal: true, //static
        approved: false, // if accountant is true it true otherwise false
    },
};
// create js code to generate json

const totalFee = 45000;

const generateOutput = (student, year) => {
    const pending = student.dues;
    const paid = totalFee - pending;
    const isPartialPaid = paid >= totalFee * 0.5;

    const accountantApproved = isPartialPaid;
    const approved = accountantApproved;

    return {
        name: student.name,
        registerNo: student.registerNo,
        course: 'B.E',
        branch: 'Computer Science Engineering',
        year: Number(year),
        isPartialPaid,
        semester: 1,
        pending,
        approvals: {
            accountant: accountantApproved,
            librarian: true,
            head_of_department: true,
            administrative_officer: true,
            principal: true,
            approved,
        },
    };
};

const allOutputs = [];

for (const year in allStudents) {
    for (const student of allStudents[year]) {
        const output = generateOutput(student, year);
        allOutputs.push(output);
    }
}

fs.writeFileSync('approvals.json', JSON.stringify(allOutputs, null, 2));
