export interface Approvals {
    accountant: boolean;
    librarian: boolean;
    head_of_department: boolean;
    administrative_officer: boolean;
    principal: boolean;
}

export interface DuesAndApprovals {
    name?: string;
    registerNo?: number;
    course?: string;
    branch?: string;
    year?: number;
    isPartialPaid?: boolean;
    semester?: number;
    pending?: number;
    approvals?: Approvals;
}
