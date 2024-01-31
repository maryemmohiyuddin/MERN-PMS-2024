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
import Notification from './notification';
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import '../../calendarStyles.css';

function Layout() {
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

    const traineeIdMatch = authCookie.match(/"traineeId":"([^"]+)"/);
    const traineeId = traineeIdMatch ? traineeIdMatch[1] : null;

    if (!traineeId) {
        // console.error('Failed to extract traineeId from the auth cookie.');
        // alert('Cookies expired or malformed. Redirecting to login page...');
        navigate('/');
    }
    useEffect(() => {

        const getAllRequests = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/project/getUserProjects", {
                    params: {
                        traineeId: traineeId
                    }
                });
                console.log("data here", data.response);
                if (data.response.length > 0) {
                    setHasNewNotifications(true);
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
        getAllRequests();
    }, [traineeId]);
    return (
        <>
            <div className="bg-light-grey h-screen w-screen overflow-x-hidden">
                {/* {isLogin && <Login updateState={updateState} />}
      {!isLogin && <Signup updateState={updateState} />} */}
               
               
                <Nav updateState={updateState} setHasNewNotification={setHasNewNotifications} notificationState={notificationState} instructorId={traineeId} showNotification={showNotification} hasNewNotifications={hasNewNotifications} lastViewedTimestamp={lastViewedTimestamp} // Pass timestamp to Nav component
                />

                <Sidebar updateState={updateState} activeItem={activeItem} setActiveItem={setActiveItem} showNotification={showNotification} traineeId={traineeId} />
                {showNotification && <Notification notificationState={notificationState} traineeId={traineeId} updateState={updateState} setActiveItem={setActiveItem} />}

                {/* Add the following line to print the dataFromChild value */}

                {component == 'PROFILE' && <Profile updateState={updateState} showNotification={showNotification} traineeId={traineeId} />}
                {component === 'DASHBOARD' && (
                    <Dashboard className={`fade-in ${component === 'DASHBOARD' ? 'active' : ''}`} updateState={updateState} showNotification={showNotification} traineeId={traineeId} />
                )}
                {component === 'PROJECTDETAILS' && <ProjectDetails className={`fade-in ${component === 'PROJECTDETAILS' ? 'active' : ''}`} updateState={updateState} showNotification={showNotification} traineeId={traineeId} />}
                {component === 'TASKS' && (
                    <Tasks className={`fade-in ${component === 'TASKS' ? 'active' : ''}`} updateState={updateState} showNotification={showNotification} traineeId={traineeId} />
                )}

                {component == 'PROGRESSANALYTICS' && <ProgressAnalytics updateState={updateState} showNotification={showNotification} traineeId={traineeId} />}
                
            </div>
            {/*  */}
        </>
    )
}

export default Layout