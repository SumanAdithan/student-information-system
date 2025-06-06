import { config } from '@config';
import { UserRole } from '@sis/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Hash password
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare password
export const isValidPassword = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// Generate jwt token
export const getJwtToken = (id: string, role: UserRole) => {
    return jwt.sign({ id, role }, config.JWT_SECRET, {
        expiresIn: Number(config.JWT_EXPIRES_TIME) * 24 * 60 * 60,
    });
};

// Verify jwt token
export const verifyJwtToken = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET);
};

// Generate QR Token
export const getQrToken = (id: string) => {
    return jwt.sign({ id }, config.JWT_SECRET);
};

// Verify payment signature
export const verifyPaymentSignature = (verifyId: string, signature: string) => {
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(verifyId)
        .digest('hex');
    return expectedSignature === signature;
};
