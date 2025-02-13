import { createApp } from './createApp';
import { connectDatabase } from '@config';

const app = createApp();
connectDatabase();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
