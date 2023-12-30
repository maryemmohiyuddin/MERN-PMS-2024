import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InstructorLayout from './components/instructor/instructor-layout.jsx';
import OnBoarding from './components/auth/on-boarding.jsx';
import Project from './components/instructor/Project-management/project.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/onboarding",
    element: <OnBoarding />,
  },
  {
    path: "/instructor",
    element: <InstructorLayout />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);