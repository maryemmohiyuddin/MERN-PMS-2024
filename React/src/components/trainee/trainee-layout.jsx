import React from 'react';
import Dashboard from './dashboard';
import ProgressAnalytics from './progress-analytics';
import ProjectDetails from './project-details';
import Tasks from './tasks';
import Sidebar from './sidebar';
import Nav from '../navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Profile from './profile';

import { useState } from 'react'

function Layout() {
    const [component, setComponent] = useState("DASHBOARD");
    const updateState = (newState) => {
        setComponent(newState);
    }

    const authCookie = Cookies.get('auth');
    const navigate = useNavigate();
    if (!authCookie) {
        console.error("The 'auth' cookie is not set.");
        alert("Cookies expired. Redirecting to login page...");
        navigate("/")


        return;
    }

    const userIdMatch = authCookie.match(/"userId":"([^"]+)"/);

    // Check if the match exists and extract the userId
    const userId = userIdMatch ? userIdMatch[1] : null;

    if (!userId) {
        console.error("Failed to extract userId from the auth cookie.");
        // Show alert and redirect user
        alert("Cookies expired or malformed. Redirecting to login page...");
        navigate("/")
        // Navigate to login page or another desired location
        // window.location.href = "/"; // Redirect to login page
    }


    // const [isLogin, setIsLogin] = useState(true);
    // const updateState = (newState) => {
    //   setIsLogin(newState);
    // }
    return (
        <>
            <div className="bg-light-grey h-screen w-screen overflow-x-hidden">
                {/* {isLogin && <Login updateState={updateState} />}
      {!isLogin && <Signup updateState={updateState} />} */}
                <Nav updateState={updateState} />

                <Sidebar updateState={updateState} />
                {component == "PROFILE" && <Profile updateState={updateState} userId={userId} />}

                {component == "DASHBOARD" && <Dashboard  updateState={updateState} userId={userId} />}
                {component == "PROJECTDETAILS" && <ProjectDetails  updateState={updateState} userId={userId} />}
                {component == "TASKS" && <Tasks  updateState={updateState} userId={userId} />}
                {component == "PROGRESSANALYTICS" && <ProgressAnalytics  updateState={updateState} userId={instructorId} />}

            </div>
            {/*  */}
        </>
    )
}

export default Layout