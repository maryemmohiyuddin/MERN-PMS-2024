import { useState, useEffect } from "react";
import { GrProjects } from "react-icons/gr";
import { FaUsers, FaTasks } from "react-icons/fa";
import { SiMicrosoftteams, SiGoogleclassroom } from "react-icons/si";
import { BsListTask } from "react-icons/bs";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import Loader from "./loader_component";
import * as ReactTooltip from 'react-tooltip';



import '../calendarStyles.css';


function Dashboard({ updateState, showNotification, instructorId }) {
    // Define the events array here
    const [date, setDate] = useState(new Date()); // Initialize with the current date
    const [Teams, setTeams] = useState([]);
    const [data , setData] = useState([]);

    const getUserById = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/user/getUserByUserId', {
                params: {
                    userId: instructorId,
                },
            });
            console.log(data.response);
            setData(data.response);
          
            setLoading(false);
        } catch (error) {
            console.error('Error approving request:', error);
            alert('Failed to approve request. Please try again.');
        }
    };

    const getAllTeams = async () => {
        try {

            const response = await axios.get("http://localhost:3000/task/getAllTasks", {
                params: {
                    instructorId: instructorId
                }
            });

            if (response && response.data && Array.isArray(response.data.response)) {
                // console.log("response", response)
                // console.log("response,data", response.data)
                // console.log("response.data.response", response.data.response)

                const mappedTeams = response.data.response.map(team => ({
                    ...team,
                    projectTitle: team.project.title,
                    MemberName: team.user.firstName + team.user.lastName,
                    taskTitle: team.taskTitle,
                    taskDes: team.taskDes,
                    taskId: team.taskId,
                    status: team.status
                }));
                setTeams(mappedTeams);
            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching Teams:", error);
        }
    };
    const [loading, setLoading] = useState(true);
   
    const tileContent = ({ date }) => {
        const eventForDate = events.find(event =>
            dayjs(event.date).isSame(date, 'day')
        );

        if (eventForDate) {
            return (
                <div>
                    <p>{eventForDate.title}</p>
                    {/* Add the tooltip */}
                    <ReactTooltip id={`tooltip-${date}`} place="top" effect="solid">
                        {eventForDate.tooltipContent}
                    </ReactTooltip>
                </div>
            );
        }

        return null;
    };
    const currentEvent = [
        {
            title: '',
            date: new Date(),  // JavaScript months are 0-indexed (December = 11)

        },

        // ... add more events as needed
    ];
    const isDeadline = (date) => {
        const eventForDate = events.find(event =>
            dayjs(event.date).isSame(date, 'day')
        );
        return eventForDate;
    };
    const isCurrent = (date) => {
        const eventForCurrent = currentEvent.find(event =>
            dayjs(event.date).isSame(date, 'day')
        );
        return eventForCurrent;
    };
    const CurrentClassName = ({ date }) => {
        if (isCurrent(date)) {
            return 'blue-circle current-date'; // Add a new class for the current date, e.g., 'current-date'
        }
        return '';
    };

  const tileClassName = ({ date }) => {
    let classes = '';

    const eventForDate = events.find(event =>
      dayjs(event.date).isSame(date, 'day')
    );

    if (eventForDate) {
      classes += ' red-circle'; // Assuming this means it's a deadline
    }

    if (dayjs(date).isSame(new Date(), 'day')) {
      classes += ' blue-circle tooltip'; // Add a class to indicate the presence of a tooltip
    }

    return classes;
  };


    const [statistics, setStatistics] = useState(null);
    const [insProjects, setInsProjects] = useState([]);

    const getInsProjects = async () => {
        try {
            // console.log(instructorId)
            const { data } = await axios.get("http://localhost:3000/project/getInsProjects", {
                params: {
                    instructorId: instructorId,
                    projectTag: 'Assigned'

                }
            });
            console.log("data", data.response)

            // console.log("r", data.response);
            setInsProjects(data.response.map(user => ({
                value: user.projectId,
                label: user.projectEnding
            })));
            console.log("data",insProjects)



        } catch (error) {
            console.error("Error fetching Teams:", error);
        }
    };
    const eventsFromApi = insProjects.map((project, index) => {
        console.log("Project Ending:", project.projectEnding);
        return {
            title: '',
            date: new Date(project.label),
            tooltipContent: 'This is Event 1',

        };
    });

    console.log("Events from ", eventsFromApi);
const events=[...eventsFromApi]
    const getAllStatistics = async () => {
        try {

            const { data } = await axios.get("http://localhost:3000/user/getAllStatistics", {
                params: {
                    instructorId: instructorId,
                }
            });

            console.log(data.response);
            setStatistics(data.response);

        } catch (error) {
            console.error("Error fetching Projects:", error);
        }
    };

    // ... rest of your Dashboard component code

    useEffect(() => {
        console.log("showNotification value:", showNotification);

        const fetchData = async () => {
            try {

                // Fetch the teams for project ID 1

                // Fetch all teams
                await getAllTeams();

                // Fetch team members
                await getAllStatistics();
                await getUserById();

                // Fetch instructor projects
                await getInsProjects();

                // Set loading to false when all data has been fetched
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        // Wrap fetchData in a setTimeout to ensure it runs after the initial rendering
        setTimeout(fetchData);
    }, [showNotification]);


    return (
        <div className={`app`}>


            {loading ? <Loader /> : (
                <div className={`w-screen h-screen flex justify-end overflow-x-hidden scrollbar-hidden  ${showNotification ? 'blurr -z-50' : ''}`}>
                <div className="ps-8 w-10/12 overflow-y-auto">
                    <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                        <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100 ps-6">
                            <li className="text-black flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400 block">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Main Dashboard</a>
                            </li>

                        </ol>
                        {/* <h3 className="font-bold text-3xl ps-6">Main Dashboard</h3> */}
                            <h5 className="font-bold text-3xl  ps-6">Welcome! {data.firstName} {data.lastName}</h5>

                    </nav>

                    <section className="py-4 mx-8 dark:bg-gray-800 dark:text-gray-100 ">

                        <div className="container grid pb-4 grid-cols-1 gap-6 m-4 mx-auto  md:m-0 md:grid-cols-2 xl:grid-cols-3">
                            <div className="bg-white  rounded-full flex overflow-hidden shadow-md dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center  ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <GrProjects /> {/* Adjust the font size as needed */}
                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">{statistics?.projectCount || 0}</p>
                                    <p>Total Projects</p>
                                </div>
                            </div>


                            <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <FaUsers fontSize="18px" className="w-7" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">{statistics?.userCount || 0}</p>
                                    <p>Total Trainees</p>
                                </div>
                            </div>

                            <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <SiMicrosoftteams fontSize="20px" className="w-7" />




                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">{statistics?.teamCount || 0}</p>
                                    <p>Total Teams</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <FaTasks className="w-7" fontSize="20px" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">{statistics?.asProjects || 0}</p>
                                    <p>Projects Assigned</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <BsListTask className="w-7" fontSize="22px" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">{statistics?.unasProjects || 0}</p>
                                    <p>Unassigned Projects</p>
                                </div>
                            </div>
                            {/* <div className="bg-white shadow-md rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <SiGoogleclassroom className="w-7" fontSize="20px" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">5</p>
                                    <p>Total classes</p>
                                </div>
                            </div> */}
                        </div>


                        <div className="flex pt-7"> <div> <h2 className="font-semibold ps-3 pb-3 ">Project Deadlines</h2>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
                                    <DemoItem label={''}>
                                        <DateCalendar
                                            className="bg-white"
                                            defaultValue={dayjs('2023-12-27')}
                                            views={['year', 'month', 'day']}
                                            events={events}  // <-- Pass the events array as a prop
                                            eventContent={eventContent}  // <-- Pass the eventContent function as a prop
                                        />

                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider> */}
                            <Calendar
                                className={"shadow-md"}
                                onChange={setDate}
                                value={date}
                                tileClassName={tileClassName}
                            />

                        </div>
                            
                            <div className="ps-10 width">
                                <h2 className="font-semibold ps-3 pb-3 ">Task Status</h2>                        <div className=" mt-2   dark:text-gray-100 dark:bg-gray-900">
                                        <div className="overflow-x-auto shadow-md bg-white">
                                            <table className="w-full text-sm border-collapse">
                                                <colgroup>
                                                </colgroup>
                                                <thead className="bg-white">
                                                    <tr className="bg-indigo-500 text-sm text-white">
                                                        <th className="p-3 border border-gray-300">Task Name</th>
                                                        <th className="p-3 border border-gray-300">Task Description</th>
                                                        <th className="p-3 border border-gray-300">Project Name</th>
                                                        <th className="p-3 border border-gray-300">Member Name</th>
                                                        <th className="p-3 border border-gray-300">Status</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Teams.map((team, index) => (

                                                        <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                                            <td className="border border-gray-300 bg-white px-4 py-2"> {team.taskTitle}</td>
                                                            <td className="border border-gray-300 bg-white px-4 py-2">{team.taskDes}</td>
                                                            <td className="border border-gray-300 bg-white px-4 py-2">{team.projectTitle}</td>
                                                            <td className="border border-gray-300 bg-white px-4 py-2">{team.MemberName}</td>
                                                            {/* Conditionally set the style based on the 'status' value */}
                                                            <td
                                                                className={`border border-gray-300 px-4 py-2 ${team.status.toLowerCase() === 'pending' ? 'text-red-400' : 'text-indigo-500'
                                                                    } font-semibold bg-white`}
                                                            >
                                                                {team.status}
                                                            </td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                            {Teams.length === 0 && (
                                                <p className="text-left mt-4 ms-3 text-red-500">No Team data yet.</p>
                                            )}
                                        </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            )}
        </div>
    );
}

export default Dashboard;
