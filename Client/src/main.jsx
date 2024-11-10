import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './components/HomePage'
import RestPage from './components/RestPage'
import RestDashboard from './components/RestDashboard'
import ChatBot from './components/ChatBot'
import Login from './components/Login.jsx'
import Signup from './components/SignUp.jsx'
import CartPage from './components/Cart.jsx'
import Search from './components/Search.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: 'cart/',
    element: <CartPage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: 'restaurant/:slug',
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
  },
  {
    path: 'login/',
    element: <Login />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: 'register/',
    element: <Signup />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: 'search/',
    element: <Search />,
    errorElement: <div>404 Not Found</div>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
