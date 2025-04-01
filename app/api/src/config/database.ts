import mongoose from 'mongoose';
import { config } from './config';

export const connectDatabase = async () => {
    try {
        const { connection } = await mongoose.connect(config.DB_LOCAL_URI);
        console.log(`MongoDB running on host ${connection.host}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error while connecting MongoDB ${err}`);
        } else {
            console.error(`Unknown error occured while connecting MongoDB ${err}`);
        }
    }
};
