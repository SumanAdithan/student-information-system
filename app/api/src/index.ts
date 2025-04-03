import { createApp } from './createApp';
import { config, connectDatabase } from '@config';

const app = createApp();
connectDatabase();

const PORT = config.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${config.PORT} in ${config.NODE_ENV} mode`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught Exception error');
    server.close(() => {
        process.exit(1);
    });
});
