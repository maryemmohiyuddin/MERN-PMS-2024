import { useState } from "react";
import { GrProjects } from "react-icons/gr";
import { FaUsers, FaTasks } from "react-icons/fa";
import { SiMicrosoftteams, SiGoogleclassroom } from "react-icons/si";
import { BsListTask } from "react-icons/bs";
import Calendar from 'react-calendar';
import dayjs from 'dayjs';

import '../calendarStyles.css';


function Dashboard() {
    // Define the events array here
    const [date, setDate] = useState(new Date());

    const events = [
        {
            title: '',
            date: new Date(2023, 11, 28),  // JavaScript months are 0-indexed (December = 11)
        },
        {
            title: '',
            date: new Date(2023, 11, 29),
        },
        // ... add more events as needed
    ];
    const currentEvent = [
        {
            title: '',
            date: new Date(2023, 11, 27),  // JavaScript months are 0-indexed (December = 11)
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



    // ... rest of your Dashboard component code


    return (
        <>

            <div className=" w-screen h-screen flex justify-end overflow-x-hidden scrollbar-hidden">
                <div className="ps-12 w-10/12 overflow-y-auto">
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
                    <section className="p-4 md:p-8 dark:bg-gray-800 dark:text-gray-100">
                        <div className="container grid pb-4 grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
                            <div className="bg-white  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <GrProjects /> {/* Adjust the font size as needed */}
                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">20</p>
                                    <p>Total Projects</p>
                                </div>
                            </div>

                        
                            <div className="bg-white  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <FaUsers fontSize="18px" className="w-7" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">75</p>
                                    <p>Total Trainees</p>
                                </div>
                            </div>

                            <div className="bg-white  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <SiMicrosoftteams fontSize="20px" className="w-7" />




                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">14</p>
                                    <p>Total Teams</p>
                                </div>
                            </div>
                            <div className="bg-white  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <FaTasks className="w-7" fontSize="20px" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">10</p>
                                    <p>Projects Assigned</p>
                                </div>
                            </div>
                            <div className="bg-white  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <BsListTask className="w-7" fontSize="22px" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">4</p>
                                    <p>Unassigned Projects</p>
                                </div>
                            </div>
                            <div className="bg-white  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <SiGoogleclassroom className="w-7" fontSize="20px" />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">5</p>
                                    <p>Total classes</p>
                                </div>
                            </div>
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
                                onChange={setDate}
                                value={date}
                                tileClassName={tileClassName}
                            />

                        </div>
                            <div className="ps-10 width">
                                <h2 className="font-semibold ps-3 pb-3 ">Task Status</h2>                        <div className=" mt-2   dark:text-gray-100 dark:bg-gray-900">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-xs bg-white rounded-xl ">
                                            <thead className="rounded-t-lg dark:bg-gray-700">
                                                <tr className="text-right border border-gray-100">
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
                                                        <span>Login Function</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                                        <span>Maryam Mohiyuddin</span>
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
                                                        <span>Login Function</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                                        <span>Maryam Mohiyuddin</span>
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
                                                        <span>Login Function</span>
                                                    </td>
                                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                                        <span>Maryam Mohiyuddin</span>
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
        </>
    );
}

export default Dashboard;
