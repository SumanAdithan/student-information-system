declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        NODE_ENV: string;
        DB_LOCAL_URI: string;
    }
}
