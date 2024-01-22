

import { useState } from "react";
import Team from "./Team-management/team";
import { MdDashboard } from "react-icons/md";
import { PiStackSimpleFill } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";
import { GrTasks } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import InstructorLayout from "./instructor-layout";


function Sidebar( updateState,activeItem,setActiveItem, showNotification, instructorId ) {
    console.log("updateState   ", updateState, "activeItem", activeItem, "setactiveItem", setActiveItem, "shownotification",showNotification,"instructorId",instructorId)

    return (
        <div className={`bg-indigo-600 sidebarr h-screen p-3 space-y-2 w-64 dark:bg-gray-900 dark:text-gray-100 fixed ${updateState.showNotification ? 'blurrr' : ' '}`}>

            <div className=" pt-7 space-x-4">
                <div className=" flex items-center justify-center p-3">
                    <h2 className="text-2xl font-bold text-white pb-3"> PROJECT</h2><span className="text-2xl ms-1 pb-3 text-white">VISTA</span>

                </div>
            </div>
            <hr />
            <div className=" divide-y dark:divide-gray-700">
                <ul className="pt-4 pb-4 space-y-1 text-sm ps-2 hover  pe-2">
                    <li
                        className={
                            ` ${updateState.activeItem === "DASHBOARD" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("DASHBOARD");
                            updateState.updateState("DASHBOARD");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "DASHBOARD" ? "text-white font-semibold" : ""} hover:text-gray  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                updateState.setActiveItem("DASHBOARD");
                                updateState.updateState("DASHBOARD");
                            }}
                        >
                            <MdDashboard
                                className={` ${updateState.activeItem === "DASHBOARD" ? "text-white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("DASHBOARD");
                                }}
                            />
                            <span className="ps-2 font-sans">Main Dashboard</span>
                        </a>
                    </li>

                    <li
                        className={
                            ` ${updateState.activeItem === "PROJECTS" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("PROJECTS");
                            updateState.updateState("PROJECTS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "PROJECTS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                updateState.setActiveItem("PROJECTS");
                                updateState.updateState("PROJECTS");
                            }}
                        >
                            <GoProjectSymlink
                                className={` ${updateState.activeItem === "PROJECTS" ? "white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("PROJECTS");
                                }}
                            />
                            <span className="ps-2 font-sans">Student Projects</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${updateState.activeItem === "TEAMS" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("TEAMS");
                            updateState.updateState("TEAMS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "TEAMS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                updateState.setActiveItem("TEAMS");
                                updateState.updateState("TEAMS");
                            }}
                        >
                            <RiTeamFill
                                className={` ${updateState.activeItem === "TEAMS" ? "white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("TEAMS");
                                }}
                            />
                            <span className="ps-2 font-sans">Teams</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${updateState.activeItem === "TASKS" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("TASKS");
                            updateState.updateState("TASKS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "TASKS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                updateState.setActiveItem("TASKS");
                                updateState.updateState("TASKS");
                            }}
                        >
                            <GrTasks
                                className={` ${updateState.activeItem === "TASKS" ? "white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("TASKS");
                                }}
                            />
                            <span className="ps-2 font-sans">Project Tasks</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${updateState.activeItem === "TRAINEE" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("TRAINEE");
                            updateState.updateState("TRAINEE");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "TRAINEE" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                               updateState.setActiveItem("TRAINEE");
                                updateState.updateState("TRAINEE");
                            }}
                        >
                            <FaUsers
                                className={` ${updateState.activeItem === "TRAINEE" ? "white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("TRAINEE");
                                }}
                            />
                            <span className="ps-2 font-sans">Trainee List</span>
                        </a>
                    </li>
                    <li
                        className={
                            ` ${updateState.activeItem === "REQUESTS" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("REQUESTS");
                            updateState.updateState("REQUESTS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "REQUESTS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                updateState.setActiveItem("REQUESTS");
                                updateState.updateState("REQUESTS");
                            }}
                        >
                            <PiStackSimpleFill
                                className={` ${updateState.activeItem === "REQUESTS" ? "text-white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("REQUESTS");
                                }}
                            />
                            <span className="ps-2 font-sans">Requests</span>
                        </a>
                    </li>

                </ul>
            </div >
        </div >
    );
        
}

export default Sidebar;



