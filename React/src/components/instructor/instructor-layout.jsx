
import Nav from '../navbar';
import Sidebar from './sidebar';
import Team from '../instructor/Team-management/team';
import Project from '../instructor/Project-management/project';
import Task from '../instructor/Task-management/task';
import Dashboard from '../dashboard';
import Stack from '../instructor/stack-management/stack';
import Trainee from '../instructor/Trainee-management/trainee';
import Request from './request-management/requests';
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import EditTeam from './Team-management/editTeam';
import { Route } from 'react-router-dom';



function InstructorLayout() {
    const [component, setComponent] = useState("DASHBOARD");
    const updateState = (newState) => {
        setComponent(newState);
    }
    
    const authCookie = Cookies.get('auth');
    const navigate = useNavigate();
    if (!authCookie) {
        console.error("The 'auth' cookie is not set.");
        // Show alert and redirect user
        alert("Cookies expired. Redirecting to login page...");
        // Navigate to login page or another desired location
        // window.location.href = "/login"; // Redirect to login page
        return;
    }

    const userIdMatch = authCookie.match(/"userId":"([^"]+)"/);

    // Check if the match exists and extract the userId
    const instructorId = userIdMatch ? userIdMatch[1] : null;

    if (!instructorId) {
        console.error("Failed to extract userId from the auth cookie.");
        // Show alert and redirect user
        alert("Cookies expired or malformed. Redirecting to login page...");
        return navigate("/")
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
                {/* <Route path="edit-team/:teamId" element={<>
                    <EditTeam />
                </>} /> */}
                {/* {isLogin && <Login updateState={updateState} />}
      {!isLogin && <Signup updateState={updateState} />} */}
                <Nav />

                <Sidebar updateState={updateState} />
                {component == "DASHBOARD" && <Dashboard updateState={updateState} instructorId={instructorId} />}
                {component == "STACKS" && <Stack updateState={updateState} instructorId={instructorId} />}
                {component == "PROJECTS" && <Project updateState={updateState} instructorId={instructorId} />}
                {component == "TEAMS" && <Team updateState={updateState} instructorId={instructorId} />}
                {/* {component == "EDITTEAMS" && <EditTeam updateState={updateState} instructorId={instructorId} />} */}
                {component == "TASKS" && <Task updateState={updateState} instructorId={instructorId} />}
                {component == "TRAINEE" && <Trainee updateState={updateState} instructorId={instructorId} />}
                {component == "REQUESTS" && <Request updateState={updateState} instructorId={instructorId} />}




            </div>

        </>
    )
}

export default InstructorLayout
