export const headerConfig = {
    studentHeaderTitles: {
        '/student': 'OVERVIEW',
        '/student/assignments': 'ASSIGNMENTS',
        '/student/internal-results': 'INTERNAL RESULTS',
        '/student/semester-results': 'SEMESTER RESULTS',
        '/student/download-notes': 'DOWNLOAD NOTES',
        '/student/dues': 'PAY DUES',
    },

    facultyHeaderTitles: {
        '/faculty': 'OVERVIEW',
        '/faculty/students': 'STUDENTS',
        '/faculty/assignments': 'ASSIGNMENTS',
        '/faculty/internal-results': 'INTERNAL RESULTS',
        '/faculty/semester-results': 'SEMESTER RESULTS',
        '/faculty/dues': 'DUES',
    },

    adminHeaderTitles: {
        '/admin': 'OVERVIEW',
        '/admin/students': 'STUDENTS',
        '/admin/assignments': 'ASSIGNMENTS',
        '/admin/internal-results': 'INTERNAL RESULTS',
        '/admin/semester-results': 'SEMESTER RESULTS',
        '/admin/dues': 'Dues',
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
