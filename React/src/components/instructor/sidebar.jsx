import { useState } from "react";
import Team from "./Team-management/team";
import { MdDashboard } from "react-icons/md";
import { PiStackSimpleFill } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";
import { GrTasks } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";



const Sidebar = (updateState) => {
    const [activeItem, setActiveItem] = useState("DASHBOARD"); // Step 1: State to man
    return (
        <div className="bg-white shadow-xl h-screen p-3 space-y-2 w-72 dark:bg-gray-900 dark:text-gray-100 fixed">
            <div className=" pt-7 space-x-4">
                <div className=" flex items-center justify-center p-3">
                    <h2 className="text-2xl font-bold text-black pb-3"> PROJECT</h2><span className="text-2xl ms-1 pb-3">VISTA</span>

                </div>
            </div>
            <hr />
            <div className=" divide-y dark:divide-gray-700">
                <ul className="pt-4 pb-4 space-y-1 text-md ps-8 pe-2">
                    <li
                        className={ 
                            ` ${activeItem === "DASHBOARD" ? "border-indigo-600 border-r-4 text-black" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("DASHBOARD");
                            updateState.updateState("DASHBOARD");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "DASHBOARD" ? "text-black" : ""} hover:text-inherit  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("DASHBOARD");
                                updateState.updateState("DASHBOARD");
                            }}
                        >
                            <MdDashboard
                                className={` ${activeItem === "DASHBOARD" ? "text-indigo-600" : ""}`}
                                onClick={() => {
                                    setActiveItem("DASHBOARD");
                                }}
                            />
                            <span className="ps-2 font-sans">Main Dashboard</span>
                        </a>
                    </li>
                    {/* <li
                        className={
                            ` ${activeItem === "STACKS" ? "border-indigo-600 border-r-4 text-black" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("STACKS");
                            updateState.updateState("STACKS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "STACKS" ? "text-black" : ""} hover:text-inherit  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("STACKS");
                                updateState.updateState("STACKS");
                            }}
                        >
                            <PiStackSimpleFill
                                className={` ${activeItem === "STACKS" ? "text-indigo-600" : ""}`}
                                onClick={() => {
                                    setActiveItem("STACKS");
                                }}
                            />
                            <span className="ps-2 font-sans">Stacks</span>
                        </a>
                    </li> */}
                    <li
                        className={
                            ` ${activeItem === "PROJECTS" ? "border-indigo-600 border-r-4 text-black" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("PROJECTS");
                            updateState.updateState("PROJECTS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "PROJECTS" ? "text-black" : ""} hover:text-inherit  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("PROJECTS");
                                updateState.updateState("PROJECTS");
                            }}
                        >
                            <GoProjectSymlink
                                className={` ${activeItem === "PROJECTS" ? "text-indigo-600" : ""}`}
                                onClick={() => {
                                    setActiveItem("PROJECTS");
                                }}
                            />
                            <span className="ps-2 font-sans">Student Projects</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "TEAMS" ? "border-indigo-600 border-r-4 text-black" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("TEAMS");
                            updateState.updateState("TEAMS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "TEAMS" ? "text-black" : ""} hover:text-inherit  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("TEAMS");
                                updateState.updateState("TEAMS");
                            }}
                        >
                            <RiTeamFill
                                className={` ${activeItem === "TEAMS" ? "text-indigo-600" : ""}`}
                                onClick={() => {
                                    setActiveItem("TEAMS");
                                }}
                            />
                            <span className="ps-2 font-sans">Teams</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "TASKS" ? "border-indigo-600 border-r-4 text-black" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("TASKS");
                            updateState.updateState("TASKS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "TASKS" ? "text-black" : ""} hover:text-inherit  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("TASKS");
                                updateState.updateState("TASKS");
                            }}
                        >
                            <GrTasks
                                className={` ${activeItem === "TASKS" ? "text-indigo-600" : ""}`}
                                onClick={() => {
                                    setActiveItem("TASKS");
                                }}
                            />
                            <span className="ps-2 font-sans">Project Tasks</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "TRAINEE" ? "border-indigo-600 border-r-4 text-black" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("TRAINEE");
                            updateState.updateState("TRAINEE");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "TRAINEE" ? "text-black" : ""} hover:text-inherit  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("TRAINEE");
                                updateState.updateState("TRAINEE");
                            }}
                        >
                            <FaUsers 
                                className={` ${activeItem === "TRAINEE" ? "text-indigo-600" : ""}`}
                                onClick={() => {
                                    setActiveItem("TRAINEE");
                                }}
                            />
                            <span className="ps-2 font-sans">Trainee List</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "REQUESTS" ? "border-indigo-600 border-r-4 text-black" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("REQUESTS");
                            updateState.updateState("REQUESTS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "REQUESTS" ? "text-black" : ""} hover:text-inherit  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("REQUESTS");
                                updateState.updateState("REQUESTS");
                            }}
                        >
                            <PiStackSimpleFill
                                className={` ${activeItem === "REQUESTS" ? "text-indigo-600" : ""}`}
                                onClick={() => {
                                    setActiveItem("REQUESTS");
                                }}
                            />
                            <span className="ps-2 font-sans">Requests</span>
                        </a>
                    </li>
                    <li className="text-black fixed bottom-2 w-48">
                        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="inline w-10 h-10 rounded-full dark:bg-gray-500" />
                        <h2 className="ms-2 inline text-lg font-semibold ">Leroy Jenkins</h2>
                        <span className="space-x-1 ms-12">
                            <a rel="noopener noreferrer" href="#" className="inline-block fixed top-30 text-xs  dark:text-gray-400">View profile</a>
                        </span>
                    </li>
                </ul>
            </div >
        </div >
    );
};

export default Sidebar;
