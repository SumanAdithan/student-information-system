import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppRoutes } from '@routes';

const App = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
        </QueryClientProvider>
    );
};

export default App;
