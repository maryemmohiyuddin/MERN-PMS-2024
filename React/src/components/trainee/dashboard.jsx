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
import Loader from "../loader_component";
import CountUp from 'react-countup';





function Dashboard({ updateState, showNotification, userId }) {
    // Define the events array here
    const [date, setDate] = useState(new Date()); // Initialize with the current date
    const [Teams, setTeams] = useState([]);
    const [data, setData] = useState([]);

    const getUserById = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/user/getUserByUserId', {
                params: {
                    userId: userId,
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
                    userId: userId
                }
            });

            if (response && response.data && Array.isArray(response.data.response)) {
                // console.log("response", response)
                // console.log("response,data", response.data)
                // console.log("response.data.response", response.data.response)

                const mappedTeams = response.data.response.map(team => ({
                    ...team,
                    projectTitle: team.project.title,
                    MemberName: team.user.firstName + " " + team.user.lastName,
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

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // ... (other functions)

    const tileContent = ({ date }) => {
        const eventForDate = events.find(event =>
            dayjs(event.date).isSame(date, 'day')
        );

        if (eventForDate) {
            return (
                <div className="">
                    <p>{eventForDate.title}</p>
                    {/* Conditional rendering based on dropdownVisible state */}
                    {dropdownVisible && selectedDate && dayjs(date).isSame(selectedDate, 'day') && (
                        <div className="dropdown-content rounded-xl px-4">
                            {/* Dropdown options */}
                            <p>Project Deadline</p>
                            {/* Add more options as needed */}
                        </div>
                    )}
                </div>
            );
        }

        return null;
    };

    const handleDateClick = (value) => {
        // Toggle dropdown visibility
        setDropdownVisible(prevVisible => !prevVisible);

        // Set or clear the selected date based on the current state
        if (!dropdownVisible) {
            setSelectedDate(value);
        } else {
            setSelectedDate(null);
        }
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
            classes += ' blue-circle tooltip fade-inn'; // Add a class to indicate the presence of a tooltip
        }

        return classes;
    };


    const [statistics, setStatistics] = useState(null);
    const [insProjects, setInsProjects] = useState([]);

    const getInsProjects = async () => {
        try {
            // console.log(userId)
            const { data } = await axios.get("http://localhost:3000/project/getInsProjects", {
                params: {
                    userId: userId,
                    projectTag: 'Assigned'

                }
            });
            console.log("data", data.response)

            // console.log("r", data.response);
            setInsProjects(data.response.map(user => ({
                value: user.projectId,
                label: user.projectEnding
            })));
            console.log("data", insProjects)



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
    const events = [...eventsFromApi]
    const getAllStatistics = async () => {
        try {

            const { data } = await axios.get("http://localhost:3000/user/getAllStatistics", {
                params: {
                    userId: userId,
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
        // Fetch team members

        const fetchData = async () => {
            try {

                // Fetch the teams for project ID 1
                // Fetch all teams
                await getAllTeams();
                // Fetch instructor projects
                await getInsProjects();
                getAllStatistics();
                await getUserById();

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


            {loading ? <div className="flex ps-48 items-center justify-center h-screen">
                <div className="w-16 h-16  border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
            </div>
                : (
                    <div className={`w-screen fade-in h-screen flex justify-end overflow-x-hidden scrollbar-hidden  ${showNotification ? 'blurr -z-50' : ''}`}>
                        <div className="px-3 w-10/12 overflow-y-auto fade-inn">
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
                                <h5 className="font-bold text-2xl  ps-6">Welcome! {data.firstName} {data.lastName}</h5>

                            </nav>

                            <section className="py-4 mx-8 dark:bg-gray-800 dark:text-gray-100 ">

                                <div className="container grid pb-4 grid-cols-1 gap-6 m-4 mx-auto  md:m-0 md:grid-cols-2 xl:grid-cols-3">
                                    <div className="bg-white  rounded-full flex overflow-hidden shadow-md dark:bg-gray-900 dark:text-gray-100">
                                        <div className="flex flex-col items-center justify-center  ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                            <GrProjects /> {/* Adjust the font size as needed */}
                                        </div>
                                        <div className="flex items-center justify-between flex-1 p-3 text-md fade-inn">
                                            <p className="text-2xl font-semibold"><CountUp start={0} end={statistics?.projectCount || 0} duration={0.9} separator="," /></p>
                                            <p>Total Projects</p>
                                        </div>
                                    </div>


                                    <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                        <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                            <FaUsers fontSize="18px" className="w-7" />

                                        </div>
                                        <div className="flex items-center justify-between flex-1 p-3 fade-inn">
                                            <p className="text-2xl font-semibold"><CountUp start={0} end={statistics?.userCount || 0} duration={0.9} separator="," /></p>
                                            <p>Total Trainees</p>
                                        </div>
                                    </div>

                                    <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                        <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                            <SiMicrosoftteams fontSize="20px" className="w-7" />




                                        </div>
                                        <div className="flex items-center justify-between flex-1 p-3 fade-inn">
                                            <p className="text-2xl font-semibold"><CountUp start={0} end={statistics?.teamCount || 0} duration={0.9} separator="," /></p>
                                            <p>Total Teams</p>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                        <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                            <FaTasks className="w-7" fontSize="20px" />

                                        </div>
                                        <div className="flex items-center justify-between flex-1 p-3 fade-inn">
                                            <p className="text-2xl font-semibold"><CountUp start={0} end={statistics?.asProjects || 0} duration={0.9} separator="," /></p>
                                            <p>Projects Assigned</p>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-md rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                        <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                            <BsListTask className="w-7" fontSize="22px" />

                                        </div>
                                        <div className="flex items-center justify-between flex-1 p-3 fade-inn">
                                            <p className="text-2xl font-semibold"><CountUp start={0} end={statistics?.unasProjects || 0} duration={0.9} separator="," /></p>
                                            <p>Unassigned Projects</p>
                                        </div>
                                    </div>
                                    {/* <div className="bg-white shadow-md rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <SiGoogleclassroom className="w-7" fontSize="20px" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3 fade-in">
                                    <p className="text-2xl font-semibold">5</p>
                                    <p>Total classes</p>
                                </div>
                            </div> */}
                                </div>


                                <div className="flex pt-7 fade-inn"> <div> <h2 className="font-semibold ps-3 pb-3 ">Project Deadlines</h2>
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
                                        className={"shadow-md mt-2"}
                                        onChange={setDate}
                                        value={date}
                                        tileClassName={tileClassName}
                                        tileContent={tileContent}
                                        onClickDay={handleDateClick} // Add this onClickDay handler
                                    // Here you pass tileContent to the Calendar component
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
                                                                    className={`border border-gray-300 px-4 py-2 ${team.status.toLowerCase() === 'pending' ? 'text-red-500' : 'text-indigo-500'
                                                                        }  bg-white`}
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
