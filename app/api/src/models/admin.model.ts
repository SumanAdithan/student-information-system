import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
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
