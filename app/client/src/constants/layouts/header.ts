import { profile } from '@assets';

export const headerConfig = {
    headerTitles: {
        '/student': 'OVERVIEW',
        '/student/assignments': 'ASSIGNMENTS',
        '/student/internal-results': 'INTERNAL RESULTS',
        '/student/semester-results': 'SEMESTER RESULTS',
        '/student/download-notes': 'DOWNLOAD NOTES',
        '/student/pay-dues': 'PAY DUES',
    },
    profileImage: profile,
    name: 'john',
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
