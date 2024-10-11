import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './components/HomePage'
import RestPage from './components/RestPage'
import RestDashboard from './components/RestDashboard'
import ChatBot from './components/ChatBot'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: 'restaurent/',
    element: <RestPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: 'RestDash/',
    element: <RestDashboard />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: 'chat/',
    element: <ChatBot />,
    errorElement: <div>404 Not Found</div>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
