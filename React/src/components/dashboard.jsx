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


import '../calendarStyles.css';


function Dashboard({updateState,instructorId}) {
    // Define the events array here
    const [date, setDate] = useState(new Date());

    const [loading, setLoading] = useState(true);
    setTimeout(() => {
        setLoading(false);
    }, 500);
    const events = [
        {
            title: '',
            date: new Date(2024, 1, 4),  // JavaScript months are 0-indexed (December = 11)
        },
        {
            title: '',
            date: new Date(2024, 1, 3),
        },
        // ... add more events as needed
    ];
    const currentEvent = [
        {
            title: '',
            date: new Date(2024, 1, 2),  // JavaScript months are 0-indexed (December = 11)
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
            return 'blue-circle';
        }
        return '';
    };
    const tileClassName = ({ date }) => {
        let classes = '';

        if (isDeadline(date)) {
            classes += ' red-circle';
        }

        if (isCurrent(date)) {
            classes += ' blue-circle';
        }

        return classes;
    };

    const [statistics, setStatistics] = useState(null);

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

        getAllStatistics(1)
    }
        , [])


    return (
               <div className="app">

            {loading ? <Loader /> : (
            <div className=" w-screen h-screen flex justify-end overflow-x-hidden scrollbar-hidden">
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
                        <h3 className="font-bold text-3xl ps-6">Main Dashboard</h3>
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
                                    <div className="overflow-x-auto shadow-md">
                                        <table className="min-w-full   text-xs bg-white rounded-xl ">
                                            <thead className="rounded-t-lg dark:bg-gray-700">
                                                <tr className="bg-indigo-500   text-sm text-white">
                                                    <th title="Task Name" className="border border-gray-100 text-sm  text-left p-3 text-md">Task Name</th>
                                                    <th title="Trainee Name" className=" border border-gray-100 text-sm  text-left p-3">Trainee Name</th>
                                                    <th title="Class" className="p-3 border border-gray-100 text-sm  text-left">Class</th>
                                                    <th title="Stack" className="p-3 border border-gray-100 text-sm  text-left">Stack</th>
                                                    <th title="Project Name" className="border border-gray-100 text-sm  text-left p-3">Project Name</th>

                                                    <th title="Status" className="p-3 border border-gray-100 text-sm  text-left">Status</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-right text-sm border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Login Function</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                                        <span>Maryam Mohiyuddin</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Cohort-4<span className=" text-gray-400 block ">(evening)</span> </span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>MERN</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>PMS</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left text-red-500 font-semibold">
                                                        <span>Pending</span>
                                                    </td>
                                                </tr>
                                                <tr className="text-right text-sm border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Signup Function</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                                        <span>Hira khalil</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Cohort-4 <span className=" text-gray-400 block">(evening)</span> </span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>MERN</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>PMS</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left text-indigo-400 font-semibold">
                                                        <span>Submitted</span>
                                                    </td>
                                                </tr>
                                                <tr className=" border-b text-sm border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Session Handling</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Bilawal Zaman</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Cohort-4 <span className=" text-gray-400 block">(evening)</span> </span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>MERN</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>PMS</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left text-indigo-400 font-semibold">
                                                        <span>In Revision</span>
                                                    </td>
                                                </tr>
                                                <tr className="text-right text-sm  border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Clerk Authentication</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                                        <span>Ahmad mughal</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Cohort-4 <span className=" text-gray-400 block">(evening)</span> </span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>MERN</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>E-commerce</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left text-indigo-400 font-semibold">
                                                        <span>Approved</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
