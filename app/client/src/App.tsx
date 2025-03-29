import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppRoutes } from '@routes';
import { Provider } from 'react-redux';
import { store } from '@store';

const App = () => {
    const queryClient = new QueryClient();
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppRoutes />
            </QueryClientProvider>
        </Provider>
    );
};

export default App;
