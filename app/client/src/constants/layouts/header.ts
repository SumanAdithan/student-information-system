export const headerConfig = {
    studentHeaderTitles: {
        '/student': 'OVERVIEW',
        '/student/assignments': 'ASSIGNMENTS',
        '/student/internal-results': 'INTERNAL RESULTS',
        '/student/semester-results': 'SEMESTER RESULTS',
        '/student/download-notes': 'DOWNLOAD NOTES',
        '/student/pay-dues': 'PAY DUES',
    },

    facultyHeaderTitles: {
        '/faculty': 'OVERVIEW',
        '/faculty/students': 'STUDENTS',
    },

    adminHeaderTitles: {
        '/admin': 'OVERVIEW',
        '/admin/students': 'STUDENTS',
        '/admin/assignments': 'STUDENTS',
    },

    dropDownItems: [
        { title: 'Notification', action: () => null },
        { title: 'Circular', action: () => null },
        {
            title: 'Logout',
            action: (logout: any) => {
                logout.mutate();
            },
        },
    ],
};
