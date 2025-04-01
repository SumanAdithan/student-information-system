import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_LOCAL_URI: process.env.DB_LOCAL_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_TIME: process.env.JWT_EXPIRES_TIME,
    COOKIE_EXPIRES_TIME: process.env.COOKIE_EXPIRES_TIME,

    AWS_S3_URI: process.env.AWS_S3_URI,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_SSL: process.env.AWS_SSL,
    AWS_FORCE_STYLE: Boolean(process.env.AWS_FORCE_STYLE),
    BUCKET_NAME: process.env.BUCKET_NAME,
};
