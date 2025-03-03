import { logo } from '@assets';

export const sidebarConfig = {
    title: 'MET',
    logo: logo,
    menuItems: [
        { name: 'Overview', href: '/student' },
        { name: 'Assignments', href: '/student/assignments' },
        { name: 'Internal Marks', href: '/student/internal-marks' },
        { name: 'Semester Marks', href: '/student/semester-marks' },
        { name: 'Download Notes', href: '/student/download-notes' },
        { name: 'Pay Dues', href: '/student/pay-dues' },
        { name: 'Dues & Approvals', href: '/student/dues-approvals' },
        { name: 'Time Table', href: '/student/time-table' },
        { name: 'Circular', href: '/student/circular' },
        { name: 'Events', href: '/student/events' },
    ],
};
