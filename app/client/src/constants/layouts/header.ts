export const headerConfig = {
    studentHeaderTitles: {
        '/student': 'OVERVIEW',
        '/student/assignments': 'ASSIGNMENTS',
        '/student/internal-results': 'INTERNAL RESULTS',
        '/student/semester-results': 'SEMESTER RESULTS',
        '/student/download-notes': 'DOWNLOAD NOTES',
        '/student/dues': 'PAY DUES',
        '/student/approvals': 'DUES AND APPROVALS',
        '/student/timetable': 'TIMETABLE',
        '/student/circular': 'CIRCULAR',
        '/student/events': 'EVENTS',
    },

    facultyHeaderTitles: {
        '/faculty': 'OVERVIEW',
        '/faculty/students': 'STUDENTS',
        '/faculty/assignments': 'ASSIGNMENTS',
        '/faculty/internal-results': 'INTERNAL RESULTS',
        '/faculty/semester-results': 'SEMESTER RESULTS',
        '/faculty/download-notes': 'DOWNLOAD NOTES',
        '/faculty/dues': 'DUES',
        '/faculty/approvals': 'DUES AND APPROVALS',
        '/faculty/timetable': 'TIMETABLE',
        '/faculty/circular': 'CIRCULAR',
        '/faculty/events': 'EVENTS',
    },

    adminHeaderTitles: {
        '/admin': 'FACULTIES',
        '/admin/students': 'STUDENTS',
        '/admin/assignments': 'ASSIGNMENTS',
        '/admin/internal-results': 'INTERNAL RESULTS',
        '/admin/semester-results': 'SEMESTER RESULTS',
        '/admin/download-notes': 'DOWNLOAD NOTES',
        '/admin/dues': 'DUES',
        '/admin/approvals': 'DUES AND APPROVALS',
        '/admin/timetable': 'TIMETABLE',
        '/admin/circular': 'CIRCULAR',
        '/admin/events': 'EVENTS',
    },

    dropDownItems: [
        {
            title: 'Logout',
            action: (logout: any) => {
                logout.mutate();
            },
        },
    ],
};
