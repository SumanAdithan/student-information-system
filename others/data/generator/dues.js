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
    name: 'Emily Taylor',
    registerNo: 961361104004,
    year: 1,
    dues_details: {
        tuition_fee: {
            total: 0,
            online: 0,
            offline: 0,
            pending: 0,
            fully_paid: true,
        },
        bus_fee: {
            total: 0,
            online: 0,
            offline: 0,
            pending: 0,
            fully_paid: true,
        },
        stationary_fee: {
            total: 0,
            online: 0,
            offline: 0,
            pending: 0,
            fully_paid: true,
        },
        sports_placement_fee: {
            total: 0,
            online: 0,
            offline: 0,
            pending: 0,
            fully_paid: true,
        },
        apparel_fee: {
            total: 0,
            online: 0,
            offline: 0,
            pending: 0,
            fully_paid: true,
        },
        examination_fee: {
            total: 0,
            online: 0,
            offline: 0,
            pending: 0,
            fully_paid: true,
        },
        fine: {
            total: 0,
            online: 0,
            offline: 0,
            pending: 0,
            fully_paid: true,
        },
    },
    total_details: {
        previous_pending: 0,
        total_amount: 0, //total amount should 45000 for all students
        paid_amount: 0, //dynamic
        pending_amount: 0, //assign the dues from student data
        isPartial_paid: true, //if pending amount is >=50% of total is true otherwise false
        isFully_paid: true, //if pending is 0 true otherwise false
    },
    transaction_history: [],
};

// total amount = 45000
// tution fees total = 15000
// bus fees total = 10000
// sports and placement total = 5000
// stationary total = 5000
// apprals total = 5000
// fine total = 5000

// and assign dynamic value

// for all category
//  {
// total: 0, - from that above data
// online: 0, - static
// offline: 0, - dynamic calculate dues pending and assign how much student paid
// pending: 0, - dynamic calculate dues pending and assign how much student paid
// fully_paid: true, - if pending 0 true otherwise false
// }

const feeBreakdown = {
    tuition_fee: 15000,
    bus_fee: 10000,
    stationary_fee: 5000,
    sports_placement_fee: 5000,
    apparel_fee: 5000,
    examination_fee: 0,
    fine: 5000,
};

const totalAmount = Object.values(feeBreakdown).reduce((acc, val) => acc + val, 0);

const generateDuesDetails = (dues) => {
    const result = {};
    let remainingDues = dues;

    for (const category in feeBreakdown) {
        const total = feeBreakdown[category];
        const pending = Math.min(remainingDues, total);
        const fully_paid = pending === 0;

        result[category] = {
            total,
            online: 0,
            offline: total - pending,
            pending,
            fully_paid,
        };

        remainingDues -= pending;
    }

    return result;
};

const allOutputs = [];

for (const year in allStudents) {
    for (const student of allStudents[year]) {
        const { name, registerNo, dues } = student;

        const dues_details = generateDuesDetails(dues);

        const paid_amount = totalAmount - dues;
        const isFully_paid = dues === 0;
        const isPartial_paid = paid_amount >= totalAmount * 0.5 && !isFully_paid;

        const total_details = {
            previous_pending: 0,
            total_amount: totalAmount,
            paid_amount,
            pending_amount: dues,
            isPartial_paid,
            isFully_paid,
        };

        const entry = {
            name,
            registerNo,
            year: Number(year),
            dues_details,
            total_details,
            transaction_history: [],
        };

        allOutputs.push(entry);
    }
}

fs.writeFileSync('dues_details.json', JSON.stringify(allOutputs, null, 2));
console.log('📄 dues_details.json file has been created.');
