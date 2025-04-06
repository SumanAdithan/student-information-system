declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        NODE_ENV: string;
        DB_LOCAL_URI: string;
        JWT_SECRET: string;
        JWT_EXPIRES_TIME: string;
        COOKIE_EXPIRES_TIME: string;
        AWS_S3_URI: string;
        AWS_REGION: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_SSL: string;
        AWS_FORCE_STYLE: string;
        BUCKET_NAME: string;
        RAZORPAY_API_KEY: string;
        RAZORPAY_API_SECRET: string;
    }
}
