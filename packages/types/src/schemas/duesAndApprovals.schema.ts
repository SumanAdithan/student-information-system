import { z } from 'zod';

const ApprovalsSchema = z.object({
    accountant: z.boolean().default(true).optional(),
    librarian: z.boolean().default(true).optional(),
    head_of_department: z.boolean().default(true).optional(),
    administrative_officer: z.boolean().default(true).optional(),
    principal: z.boolean().default(true).optional(),
});

export const DuesAndApprovalsSchema = z.object({
    year: z.number().optional(),
    semester: z.number().optional(),
    approvals: ApprovalsSchema.optional(),
});

export type DuesAndApprovalsDto = z.infer<typeof DuesAndApprovalsSchema>;
export type UpdateDuesAndApprovalsDto = z.infer<typeof DuesAndApprovalsSchema>;
