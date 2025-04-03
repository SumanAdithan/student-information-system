export interface FeeDetails {
    monthly_pay: number;
    total: number;
    paid: number;
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

type Category = 'TuitionFee' | 'BusFee' | 'Stationary' | 'Sports&placement' | 'Apparel' | 'ExaminationFee' | 'Fine';
type Status = 'Success' | 'Failed' | 'pending';

export interface Transaction {
    date: string;
    transactionId: string;
    category: Category;
    amount: number;
    status: Status;
    method: string;
}

export interface Dues {
    name: string;
    registerNo: number;
    dues_details: DuesDetails;
    total_details: TotalDetails;
    transaction_history: Transaction[];
}
