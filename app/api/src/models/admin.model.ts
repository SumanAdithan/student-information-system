import { AssignmentResult } from '@sis/types';
import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
    profileImage: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

const AdminModel = model('Admin', AdminSchema);

export const getAdminById = (adminId: string) => AdminModel.findById(adminId);
export const getAdminByEmail = (adminEmail: string) => AdminModel.findOne({ email: adminEmail });
