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
        <div className="bg-indigo-600 h-screen p-3 space-y-2 w-72 dark:bg-gray-900 dark:text-gray-100 fixed">
            <div className=" pt-7 space-x-4">
                <div className=" flex items-center justify-center p-3">
                    <h2 className="text-2xl font-bold text-white pb-3"> PROJECT</h2><span className="text-2xl ms-1 pb-3 text-white">VISTA</span>

                </div>
            </div>
            <hr />
            <div className=" divide-y dark:divide-gray-700">
                <ul className="pt-4 pb-4 space-y-1 text-md ps-8 pe-2">
                    <li
                        className={ 
                            ` ${activeItem === "DASHBOARD" ? "border-white border-r-4" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("DASHBOARD");
                            updateState.updateState("DASHBOARD");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "DASHBOARD" ? "text-white font-semibold" : ""} hover:text-gray  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("DASHBOARD");
                                updateState.updateState("DASHBOARD");
                            }}
                        >
                            <MdDashboard
                                className={` ${activeItem === "DASHBOARD" ? "text-white" : ""}`}
                                onClick={() => {
                                    setActiveItem("DASHBOARD");
                                }}
                            />
                            <span className="ps-2 font-sans">Main Dashboard</span>
                        </a>
                    </li>
                    
                    <li
                        className={
                            ` ${activeItem === "PROJECTS" ? "white border-r-4 text-white " : ""}`
                        }
                        onClick={() => {
                            setActiveItem("PROJECTS");
                            updateState.updateState("PROJECTS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "PROJECTS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("PROJECTS");
                                updateState.updateState("PROJECTS");
                            }}
                        >
                            <GoProjectSymlink
                                className={` ${activeItem === "PROJECTS" ? "white" : ""}`}
                                onClick={() => {
                                    setActiveItem("PROJECTS");
                                }}
                            />
                            <span className="ps-2 font-sans">Student Projects</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "TEAMS" ? "white border-r-4 text-white" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("TEAMS");
                            updateState.updateState("TEAMS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "TEAMS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("TEAMS");
                                updateState.updateState("TEAMS");
                            }}
                        >
                            <RiTeamFill
                                className={` ${activeItem === "TEAMS" ? "white" : ""}`}
                                onClick={() => {
                                    setActiveItem("TEAMS");
                                }}
                            />
                            <span className="ps-2 font-sans">Teams</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "TASKS" ? "white border-r-4 text-white" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("TASKS");
                            updateState.updateState("TASKS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "TASKS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("TASKS");
                                updateState.updateState("TASKS");
                            }}
                        >
                            <GrTasks
                                className={` ${activeItem === "TASKS" ? "white" : ""}`}
                                onClick={() => {
                                    setActiveItem("TASKS");
                                }}
                            />
                            <span className="ps-2 font-sans">Project Tasks</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "TRAINEE" ? "white border-r-4 text-white" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("TRAINEE");
                            updateState.updateState("TRAINEE");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "TRAINEE" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("TRAINEE");
                                updateState.updateState("TRAINEE");
                            }}
                        >
                            <FaUsers 
                                className={` ${activeItem === "TRAINEE" ? "white" : ""}`}
                                onClick={() => {
                                    setActiveItem("TRAINEE");
                                }}
                            />
                            <span className="ps-2 font-sans">Trainee List</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${activeItem === "REQUESTS" ? "white border-r-4 text-white" : ""}`
                        }
                        onClick={() => {
                            setActiveItem("REQUESTS");
                            updateState.updateState("REQUESTS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${activeItem === "REQUESTS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("REQUESTS");
                                updateState.updateState("REQUESTS");
                            }}
                        >
                            <PiStackSimpleFill
                                className={` ${activeItem === "REQUESTS" ? "text-white" : ""}`}
                                onClick={() => {
                                    setActiveItem("REQUESTS");
                                }}
                            />
                            <span className="ps-2 font-sans">Requests</span>
                        </a>
                    </li>
                   
                </ul>
            </div >
        </div >
    );
};

export default Sidebar;
