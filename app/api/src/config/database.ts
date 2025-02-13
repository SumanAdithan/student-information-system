import mongoose from 'mongoose';

export const connectDatabase = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DB_LOCAL_URI);
        console.log(`MongoDB running on host ${connection.host}`);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error while connecting MongoDB ${err}`);
        } else {
            console.error(`Unknown error occured while connecting MongoDB ${err}`);
        }
    }
};
