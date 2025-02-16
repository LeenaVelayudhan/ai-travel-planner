import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import CreateTrip from './create-trip';
import Header from './create-trip/custom/Header';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Use your App component for the main route
  },
  {
    path:'/create-trip',
    element:<
    CreateTrip/>
  },
  {
    path:'view-trip/:tripId',
    element:<Viewtrip/>
  }
]);

// Render the application with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>    <Header/>
    <Toaster/>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>;
  </StrictMode>
);
