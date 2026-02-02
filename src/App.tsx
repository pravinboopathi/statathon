import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { governmentTheme } from './theme/governmentTheme';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import { DatasetBrowser } from './components/DatasetBrowser/DatasetBrowser';
import { QueryBuilder } from './components/QueryBuilder/QueryBuilder';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

type AppView = 'dashboard' | 'datasets' | 'query-builder' | 'api-docs';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'datasets':
        return <DatasetBrowser />;
      case 'query-builder':
        return <QueryBuilder />;
      case 'api-docs':
        return <div>API Documentation Coming Soon</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={governmentTheme}>
        <CssBaseline />
        <Layout 
          currentView={currentView}
          onNavigationChange={(view: string) => setCurrentView(view as AppView)}
        >
          {renderCurrentView()}
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
