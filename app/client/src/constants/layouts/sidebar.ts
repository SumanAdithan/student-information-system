import { logo } from '@assets';

export const sidebarConfig = {
    title: 'MET',
    logo: logo,
    studentNavLinks: [
        { name: 'Overview', href: '/student' },
        { name: 'Assignments', href: '/student/assignments' },
        { name: 'Internal Results', href: '/student/internal-results' },
        { name: 'Semester Results', href: '/student/semester-results' },
        { name: 'Download Notes', href: '/student/download-notes' },
        { name: 'Pay Dues', href: '/student/pay-dues' },
        { name: 'Dues & Approvals', href: '/student/dues-approvals' },
        { name: 'Time Table', href: '/student/time-table' },
        { name: 'Circular', href: '/student/circular' },
        { name: 'Events', href: '/student/events' },
    ],
    facultyNavLinks: [
        { name: 'Overview', href: '/faculty' },
        { name: 'Students', href: '/faculty/students' },
        { name: 'Assignments', href: '/faculty/assignments' },
        { name: 'Internal Results', href: '/faculty/internal-results' },
        { name: 'Semester Results', href: '/faculty/semester-results' },
    ],
    adminNavLinks: [
        { name: 'Overview', href: '/admin' },
        { name: 'Students', href: '/admin/students' },
        { name: 'Assignments', href: '/admin/assignments' },
        { name: 'Internal Results', href: '/admin/internal-results' },
        { name: 'Semester Results', href: '/admin/semester-results' },
    ],
};
