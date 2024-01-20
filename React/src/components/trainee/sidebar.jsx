import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { PiStackSimpleFill } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";


import { IoMdAnalytics } from "react-icons/io";



const Sidebar = (updateState) => {
    const [activeItem, setActiveItem] = useState("DASHBOARD"); // Step 1: State to man

    const [open, setOpen] = useState(true);

    return (
        <div className="bg-indigo-600 go- shadow-xl h-screen p-2 space-y-2 w-72 dark:bg-gray-900 dark:text-gray-100 absolute">
            <div className=" pt-7 space-x-4">
                <div className=" flex items-center justify-center p-3">
                    <h2 className="text-2xl font-bold text-white pb-3"> PROJECT</h2><span className="text-2xl text-white ms-1 pb-3">VISTA</span>

                </div>
            </div>
            <hr />
            <div className=" divide-y ">
                <ul className="pt-4 pb-4 space-y-1 text-md  ps-8 pe-2">
                    <li className={
                        ` ${activeItem === "DASHBOARD" ? "border-white border-r-4" : ""}`
                    }
                        onClick={() => {
                            setActiveItem("DASHBOARD");
                            updateState.updateState("DASHBOARD");
                        }}>
                       <a rel="noopener noreferrer"
                        className={` ${activeItem === "DASHBOARD" ? "text-white font-semibold" : ""} hover:text-gray  flex items-center p-2 space-x-3 rounded-md`}
                        href="#" onClick={() => {
                            setActiveItem("DASHBOARD");
                            updateState.updateState("DASHBOARD");
                        }}    >/                        <MdDashboard className="text-white" />

                            <span className="ps-2 text-white font-sans">Dashboard</span>
                        </a>
                    </li>
                    <li className={
                        ` ${activeItem === "PROJECTDETAILS" ? "border-white border-r-4" : ""}`
                    }
                        onClick={() => {
                            setActiveItem("PROJECTDETAILS");
                            updateState.updateState("PROJECTDETAILS");
                        }}>

                        <a rel="noopener noreferrer"
                            className={` ${activeItem === "PROJECTDETAILS" ? "text-white font-semibold" : ""} hover:text-gray  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("PROJECTDETAILS");
                                updateState.updateState("PROJECTDETAILS");
                            }}    >/                              <PiStackSimpleFill className="text-white" />

                            <span className="ps-2 text-white font-sans">Project Details</span>
                        </a>
                    </li>
                    <li className={
                        ` ${activeItem === "TASKS" ? "border-white border-r-4" : ""}`
                    }
                        onClick={() => {
                            setActiveItem("TASKS");
                            updateState.updateState("TASKS");
                        }}>
                        <a rel="noopener noreferrer"
                            className={` ${activeItem === "TASKS" ? "text-white font-semibold" : ""} hover:text-gray  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("TASKS");
                                updateState.updateState("TASKS");
                            }} >
                            <GoProjectSymlink className="text-white" />

                            <span className="ps-2 text-white font-sans"> Tasks</span>
                        </a>
                    </li>
                    <li className={
                        ` ${activeItem === "PROGRESSANALYTICS" ? "border-white border-r-4" : ""}`
                    }
                        onClick={() => {
                            setActiveItem("PROGRESSANALYTICS");
                            updateState.updateState("PROGRESSANALYTICS");
                        }}>
                        <a rel="noopener noreferrer"
                            className={` ${activeItem === "PROGRESSANALYTICS" ? "text-white font-semibold" : ""} hover:text-gray  flex items-center p-2 space-x-3 rounded-md`}
                            href="#" onClick={() => {
                                setActiveItem("PROGRESSANALYTICS");
                                updateState.updateState("PROGRESSANALYTICS");
                            }} >
                            <IoMdAnalytics className="text-white" />

                            <span className="ps-2 text-white font-sans">Progress Analytics</span>
                        </a>
                    </li>

                </ul>
            </div >
        </div >
    );
};

export default Sidebar;