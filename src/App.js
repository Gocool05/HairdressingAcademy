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

  useEffect(() => {
    // Intercept Google Translate's URL hash change to prevent reloading
    const handleHashChange = (e) => {
      // If hash starts with #googtrans, stop it from being handled as a route change
      if (window.location.hash.startsWith('#googtrans')) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    // Add event listener to stop hash change
    window.addEventListener('hashchange', handleHashChange, false);

    // Cleanup event listener when the component is unmounted
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
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
