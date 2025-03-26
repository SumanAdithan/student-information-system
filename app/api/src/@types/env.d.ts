declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        NODE_ENV: string;
        DB_LOCAL_URI: string;
        JWT_SECRET: string;
        JWT_EXPIRES_TIME: string;
        COOKIE_EXPIRES_TIME: string;
    }
}
