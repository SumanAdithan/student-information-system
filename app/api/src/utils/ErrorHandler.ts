export default class ErrorHandler extends Error {
    name: string;
    statusCode: number;
    details?: Record<string, any>;
    constructor(statusCode: number, message: string, name?: string, details?: Record<string, any>) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}
