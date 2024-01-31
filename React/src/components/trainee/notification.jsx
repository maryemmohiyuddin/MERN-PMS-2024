import { FaTimes } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Notification({ notificationState, traineeId ,updateState,setActiveItem }) {
    const [requests, setRequests] = useState([]);
    const [Data, setData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [tasksLoading, setTasksLoading] = useState(true);
    const [requestsLoading, setRequestsLoading] = useState(true);
    // Run this effect once when the component mounts

    useEffect(() => {
        // Initialize loading states for each API call
    

        const getAllTasks = async () => {
            try {
                const { data: tasksData } = await axios.get("http://localhost:3000/task/getTaskByUserId", {
                    params: {
                        traineeId: traineeId
                    }
                });

                setData(tasksData.response || []);
            } catch (error) {
                console.error("Error fetching Tasks:", error);
            } finally {
                // Set tasks loading to false once data is fetched (whether successful or not)
                setTasksLoading(false);
            }
        };

        const getAllRequests = async () => {
            try {
                const { data: projectsData } = await axios.get("http://localhost:3000/project/getUserProjects", {
                    params: {
                        traineeId: traineeId
                    }
                });

                // Extract data from the names and projects objects
                const namesData = projectsData.response.names || {};
                const projectData = projectsData.response.projects.project || {};

                // Extract needed properties from the project object
                const { title, projectStarting, projectEnding } = projectData;

                // Extract needed properties from the names object
                const { instructorName, leaderName } = namesData;

                // Create a new object with all the extracted properties
                const requestObject = {
                    instructorName,
                    leaderName,
                    title,
                    projectStarting,
                    projectEnding
                };

                // Set the requests state with an array containing the request object
                setRequests([requestObject]);
            } catch (error) {
                console.error("Error fetching requests:", error);
            } finally {
                // Set requests loading to false once data is fetched (whether successful or not)
                setRequestsLoading(false);
            }
        };

        // Call both API functions
        getAllRequests();
        getAllTasks();
    }, [traineeId]);
    return (
        <>
           
            <div className="bg-white notification h-screen w-1/5 z-100 absolute right-0 shadow-xl">
                <div className="flex justify-between bg-indigo-500 items-center p-3 ps-5 text-white">
                    <h4 className="font-semibold">Notifications</h4>
                    <button className=' bg-indigo-500' onClick={() => notificationState.notificationState(false)}>
                        <FaTimes />
                    </button>
                </div>
                {tasksLoading || requestsLoading ? (
                    <div className="flex items-center justify-center h-screen">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
                    </div>
                ) : (
                    <div className="fade-in h-full text-sm">
                            {requests.length === 0 && Data.length === 0 ? (
                                <p>No notifications</p>
                            ) : (
                                <ul className=''>
                                    {Data.map((task, index) => (
                                        <div key={index}>
                                            <li className='flex pb-5 ps-5 pe-5 hover-effect cursor-pointer'
                                                onClick={() => {
                                                    notificationState.notificationState(false);
                                                    updateState("TASKS");
                                                    setActiveItem("TASKS");
                                                }}
                                                key={task.taskId}
                                            >
                                                <IoIosNotifications style={{ fontSize: '50px' }} />
                                                <span className='mt-3 ms-3'>
                                                    You have been assigned a new task named
                                                    <span className='font-semibold'> {task.title} </span>
                                                   
                                                    .
                                                </span>
                                            </li>
<hr />
                                            </div>
                                    ))}

                                    {requests.map((request, index) => (
                                        <div key={index}>
                                            <li className='flex pb-5 ps-5 pe-5 hover-effect cursor-pointer'
                                                onClick={() => {
                                                    notificationState.notificationState(false);
                                                    updateState("PROJECTDETAILS");
                                                    setActiveItem("PROJECTDETAILS");
                                                }}
                                                key={request.projectId}
                                            >
                                                <IoIosNotifications style={{ fontSize: '50px' }} />
                                                <span className='mt-3 ms-3'>
                                                    You have a project
                                                    <span className='font-semibold'> {request.title} </span>
                                                    assigned by
                                                    <span className='font-semibold'>
                                                        {' '}{request.instructorName}{' '}
                                                    </span>
                                                    .
                                                </span>
                                            </li>
<hr />
                                            {index < requests.length - 1 && <hr className="" />}
                                        </div>
                                    ))}
                                </ul>
                            )}
                </div>
                    )}

            </div>
        </>
    );
}

export default Notification;
