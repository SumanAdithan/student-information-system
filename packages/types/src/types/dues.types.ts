export interface FeeDetails {
    total: number;
    online: number;
    offline: number;
    pending: number;
    fully_paid: boolean;
}

export interface DuesDetails {
    tuition_fee: FeeDetails;
    bus_fee: FeeDetails;
    stationary_fee: FeeDetails;
    sports_placement_fee: FeeDetails;
    apparel_fee: FeeDetails;
    examination_fee: FeeDetails;
    fine: FeeDetails;
}

export interface TotalDetails {
    total_amount: number;
    paid_amount: number;
    pending_amount: number;
    isPartial_paid: boolean;
}

export type Category =
    | 'Tuition Fee'
    | 'Bus Fee'
    | 'Stationary Fee'
    | 'Sports and Placement Fee'
    | 'Apparel Fee'
    | 'Examination Fee'
    | 'Fine';

export interface Transaction {
    studentData?: {
        name: string;
        registerNo: number;
        semester: number;
        department: string;
        batch: string;
    };
    transactionId: string;
    category: Category;
    amount: number;
    method: string;
    paidOn: string;
}

export interface Dues {
    name: string;
    registerNo: number;
    year: number;
    dues_details: DuesDetails;
    total_details: TotalDetails;
    transaction_history: Transaction[];
}

export const categoryMap: Record<string, Category> = {
    tuition_fee: 'Tuition Fee',
    bus_fee: 'Bus Fee',
    stationary_fee: 'Stationary Fee',
    sports_placement_fee: 'Sports and Placement Fee',
    apparel_fee: 'Apparel Fee',
    examination_fee: 'Examination Fee',
    fine: 'Fine',
};

export const reverseCategoryMap: Record<Category, string> = Object.fromEntries(
    Object.entries(categoryMap).map(([key, value]) => [value, key])
) as Record<Category, string>;
