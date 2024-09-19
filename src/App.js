import logo from './logo.svg';
import './App.css';
import AllRoutes from './allRoutes';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from 'react';


const queryClient = new QueryClient();
function App() {

  useEffect(() => {
    const handlePopstate = () => {
      // Reload the page when navigating back
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AllRoutes/>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
