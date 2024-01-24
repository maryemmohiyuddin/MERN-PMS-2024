import React, { useState } from 'react';
import Nav from '../navbar';
import Sidebar from './sidebar';
import Team from '../instructor/Team-management/team';
import Project from '../instructor/Project-management/project';
import Task from '../instructor/Task-management/task';
import Dashboard from '../dashboard';
import Stack from '../instructor/stack-management/stack';
import Trainee from '../instructor/Trainee-management/trainee';
import Request from './request-management/requests';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Notification from './notification';
import Profile from './profile';
import axios from 'axios';
import { useEffect } from 'react';

function InstructorLayout() {
    const [component, setComponent] = useState('DASHBOARD');
    const updateState = (newState) => {
        setComponent(newState);
    };
    const [hasNewNotifications, setHasNewNotifications] = useState(true);
    const [lastViewedTimestamp, setLastViewedTimestamp] = useState(null);

    const [showNotification, setShowNotification] = useState(false);

    const notificationState = {
        notificationState: (value) => {
            setShowNotification(value);
        },
    };
    const [activeItem, setActiveItem] = useState("DASHBOARD"); // Step 1: State to man

    const [dataFromChild, setDataFromChild] = useState(null);

    const receiveDataFromChild = (data) => {
        setDataFromChild(data);
    };

    const hideNotificationHandler = () => {
        setShowNotification(false);
    };

    const authCookie = Cookies.get('auth');
    const navigate = useNavigate();

    if (!authCookie) {
        // console.error("The 'auth' cookie is not set.");
        // alert('Cookies expired. Redirecting to login page...');
        navigate('/');
        return;
    }

    const userIdMatch = authCookie.match(/"userId":"([^"]+)"/);
    const instructorId = userIdMatch ? userIdMatch[1] : null;

    if (!instructorId) {
        // console.error('Failed to extract userId from the auth cookie.');
        // alert('Cookies expired or malformed. Redirecting to login page...');
        navigate('/');
    }
    useEffect(() => {

        const getAllRequests = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/user/getAllRequests", {
                    params: {
                        instructorId: instructorId
                    }
                });
                console.log("data here", data.response);
                if(data.response.length>0){
                setHasNewNotifications(true);
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
        getAllRequests();
    }, [instructorId]);
    return (
        <>
            <div className="bg-light-grey h-screen w-screen overflow-x-hidden">
                <Nav updateState={updateState} setHasNewNotification={setHasNewNotifications} notificationState={notificationState} instructorId={instructorId} showNotification={showNotification} hasNewNotifications={hasNewNotifications} lastViewedTimestamp={lastViewedTimestamp} // Pass timestamp to Nav component
 />

                <Sidebar updateState={updateState} activeItem={activeItem} setActiveItem={setActiveItem} showNotification={showNotification} instructorId={instructorId} />
                {showNotification && <Notification notificationState={notificationState} instructorId={instructorId} updateState={updateState} setActiveItem={setActiveItem} />}

                {/* Add the following line to print the dataFromChild value */}
            
                {component == 'PROFILE' && <Profile updateState={updateState} showNotification={showNotification} instructorId={instructorId}/>}
                {component === 'DASHBOARD' && (
                    <Dashboard className={`fade-in ${component === 'DASHBOARD' ? 'active' : ''}`} updateState={updateState} showNotification={showNotification} instructorId={instructorId} />
                )} 
                {component === 'STACKS' && <Stack className={`fade-in ${component === 'STACKS' ? 'active' : ''}`} updateState={updateState} showNotification={showNotification} instructorId={instructorId} />}
                {component === 'PROJECTS' && (
                    <Project className={`fade-in ${component === 'PROJECTS' ? 'active' : ''}`} updateState={updateState} showNotification={showNotification} instructorId={instructorId} />
                )}

                {component == 'TEAMS' && <Team updateState={updateState} showNotification={showNotification} instructorId={instructorId} />}
                {component == 'TASKS' && <Task updateState={updateState} showNotification={showNotification} instructorId={instructorId} />}
                {component == 'TRAINEE' && (
                    <Trainee updateState={updateState} showNotification={showNotification} instructorId={instructorId} />
                )}
                {component == 'REQUESTS' && (
                    <Request updateState={updateState} showNotification={showNotification} instructorId={instructorId} />
                )}
            </div>
        </>
    );
}

export default InstructorLayout;
