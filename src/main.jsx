import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import CreateTrip from './create-trip';
import Header from './create-trip/custom/Header';

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
  }
]);

// Render the application with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </StrictMode>
);
