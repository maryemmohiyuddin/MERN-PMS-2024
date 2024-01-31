import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { PiStackSimpleFill } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";


import { IoMdAnalytics } from "react-icons/io";


function Sidebar(updateState, activeItem, setActiveItem, showNotification, instructorId) {
    console.log("updateState   ", updateState, "activeItem", activeItem, "setactiveItem", setActiveItem, "shownotification", showNotification, "instructorId", instructorId)


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

                            <MdDashboard className={` ${updateState.activeItem === "DASHBOARD" ? "text-white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("DASHBOARD");
                                }} />

                            <span className="ps-2 font-sans">Main Dashboard</span>
                        </a>
                    </li>

                    <li
                        className={
                            ` ${updateState.activeItem === "PROJECTDETAILS" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("PROJECTDETAILS");
                            updateState.updateState("PROJECTDETAILS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "PROJECTDETAILS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                updateState.setActiveItem("PROJECTDETAILS");
                                updateState.updateState("PROJECTDETAILS");
                            }}
                        >                              <PiStackSimpleFill className={` ${updateState.activeItem === "PROJECTDETAILS" ? "white" : ""}`}
                            onClick={() => {
                                updateState.setActiveItem("PROJECTDETAILS");
                            }} />

                            <span className="ps-2 font-sans">Project Details</span>
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
                            <GoProjectSymlink className={` ${updateState.activeItem === "TASKS" ? "white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("TASKS");
                                }} />

                            <span className="ps-2 font-sans"> Tasks</span>
                        </a>
                    </li>
                    {/* <li
                        className={
                            ` ${updateState.activeItem === "PROGRESSANALYTICS" ? "border-white bg-indigo-400 rounded-md " : "hover:bg-indigo-500 hover-effect rounded-md"}`
                        }
                        onClick={() => {
                            updateState.setActiveItem("PROGRESSANALYTICS");
                            updateState.updateState("PROGRESSANALYTICS");
                        }}
                    >
                        <a
                            rel="noopener noreferrer"
                            className={` ${updateState.activeItem === "PROGRESSANALYTICS" ? "text-white font-semibold" : ""}   flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                updateState.setActiveItem("PROGRESSANALYTICS");
                                updateState.updateState("PROGRESSANALYTICS");
                            }}
                        >
                            <IoMdAnalytics className={` ${updateState.activeItem === "PROGRESSANALYTICS" ? "white" : ""}`}
                                onClick={() => {
                                    updateState.setActiveItem("PROGRESSANALYTICS");
                                }} />

                            <span className="ps-2  font-sans">Progress Analytics</span>
                        </a>
                    </li> */}

                </ul>
            </div >
        </div >
    );
};

export default Sidebar;