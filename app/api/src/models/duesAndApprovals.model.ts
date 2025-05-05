import { DuesAndApprovals, QueryParams, UpdateDuesAndApprovalsDto } from '@sis/types';
import { Schema, model } from 'mongoose';

const DuesAndApprovalsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    registerNo: {
        type: Number,
        required: true,
    },
    course: {
        type: String,
        default: 'B.E',
    },
    branch: {
        type: String,
        default: 'Computer Science Engineering',
    },
    year: {
        type: Number,
        required: true,
    },
    isPartialPaid: {
        type: Boolean,
        default: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    pending: {
        type: Number,
        default: 0,
    },
    approvals: {
        accountant: {
            type: Boolean,
            default: true,
        },
        librarian: {
            type: Boolean,
            default: true,
        },
        head_of_department: {
            type: Boolean,
            default: true,
        },
        administrative_officer: {
            type: Boolean,
            default: true,
        },
        principal: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
    },
});

const DuesAndApprovalsModel = model('dues_and_approvals', DuesAndApprovalsSchema);

export const createDuesAndApprovalsData = (data: DuesAndApprovals) => DuesAndApprovalsModel.create(data);

export const getAuthenticatedDuesAndApprovalsData = (registerNo: number) =>
    DuesAndApprovalsModel.findOne({ registerNo });
export const getDuesAndApprovalsByRegisterNo = (registerNo: number) => DuesAndApprovalsModel.findOne({ registerNo });

export const updateDuesAndApprovalsData = (registerNo: number, updatedData: UpdateDuesAndApprovalsDto) =>
    DuesAndApprovalsModel.findOneAndUpdate({ registerNo }, updatedData, { new: true, runValidators: true });

export const updateDuesAndApprovalsDefault = (
    registerNo: number,
    updatedData: { pending: number; isPartialPaid: boolean }
) => {
    const isApproved = updatedData.pending === 0;

    return DuesAndApprovalsModel.findOneAndUpdate(
        { registerNo },
        {
            ...updatedData,
            'approvals.approved': isApproved,
        },
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteDuesAndApprovalsByRegisterNo = (registerNo: number) =>
    DuesAndApprovalsModel.findOneAndDelete({ registerNo });

export const getFilteredDuesAndApprovals = async (queryStr: QueryParams) => {
    const year = parseInt(queryStr.year);

    const pipeline: any[] = [];

    if (year) {
        pipeline.push({ $match: { year } });
    }

    if (queryStr.partialPaid !== undefined) {
        const isPartialPaid = queryStr.partialPaid === 'true';
        pipeline.push({
            $match: {
                isPartialPaid,
            },
        });
    }

    if (queryStr.fullyPaid !== undefined) {
        if (queryStr.fullyPaid === 'true') {
            pipeline.push({
                $match: {
                    pending: 0,
                },
            });
        } else {
            pipeline.push({
                $match: {
                    pending: { $ne: 0 },
                },
            });
        }
    }

    if (queryStr.eligible !== undefined) {
        const isEligible = queryStr.eligible === 'true';
        pipeline.push({
            $match: {
                'approvals.approved': isEligible,
            },
        });
    }

    pipeline.push({
        $project: {
            name: 1,
            registerNo: 1,
            year: 1,
            course: 1,
            branch: 1,
            isPartialPaid: 1,
            semester: 1,
            pending: 1,
            approvals: 1,
        },
    });

    return DuesAndApprovalsModel.aggregate(pipeline);
};

export const updateDefaultDuesAndApprovalsData = ({
    registerNo,
    updatedItems,
}: {
    registerNo: number;
    updatedItems: { name: string; registerNo: number; year: number; semester: number };
}) => DuesAndApprovalsModel.findOneAndUpdate({ registerNo }, updatedItems);
