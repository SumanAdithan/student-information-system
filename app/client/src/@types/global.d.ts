export {};

declare global {
    interface Window {
        Razorpay: any;
    }
}

declare module '*.png' {
    const value: string;
    export default value;
}
