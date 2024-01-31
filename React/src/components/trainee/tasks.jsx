import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { createMemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Select from "react-select";
import Loader from '../loader_component';


function Tasks({updateState, showNotification, traineeId}) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [addData, setAddData] = useState({});


    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);

    const [selectedprojectId, setSelectedprojectId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);  // default page is 1
    const [Data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    const handleCloseModal = () => {
        setModalOpen(false);
        setDimmed(false);
    };



    const [currentproject, setCurrentproject] = useState(null);
    const handleEditClick = (project) => {
        setCurrentproject(project);
        setEditData(project);
        setEditModalOpen(true);
        setDimmed(true);
    };
    const handleAddClick = (project) => {
        setCurrentproject(project);
        setAddData({}); // Clear previous data
        setAddModalOpen(true);
        setDimmed(true);
    };

    const [assignedProjects, setAssignedProjects] = useState([]);
    const [unassignedProjects, setUnassignedProjects] = useState([]);
    const handleEditAction = () => {
        setEditModalOpen(false);
        setDimmed(false);
    };
    const handleAddAction = () => {
        // Check if any of the required fields are empty
        if (!addData.title || !addData.description || !addData.projectEnding) {
            alert("Please fill in all required fields before adding a project.");
            return; // Exit the function if any field is empty
        }

        setAddModalOpen(false);
        setDimmed(false);
    };

    const handleCloseAction = () => {
        // Check if any of the required fields are empty


        setAddModalOpen(false);
        setDimmed(false);
    };

    const contentClassName = isDimmed ? 'dimmed' : '';


    // console.log(userId); // This will log the userId value

    const getAllProjects = async () => {
        try {
            console.log("userId", traineeId.traineeId);
            const { data } = await axios.get("http://localhost:3000/task/getTaskByUserId", {
                params: {
                    traineeId: traineeId
                }
            });
            setData(data);
            setTimeout(() => {
                setLoading(false);
            }, 500);

            console.log("hereee", data.response);

            if (data.response) {
                let formattedProjects = [];

                if (Array.isArray(data.response)) {
                    // If projects is an array, use it directly
                    formattedProjects = data.response.map(item => ({
                        taskId:item.taskId,           
                                     title: item.title,
                        description: item.description,
                        status: item.status,
                        instructorId: item.instructorId


                        // Add other properties as needed
                    })
                    );
                    console.log("Array")
                } else if (typeof data.response === 'object') {
                    // If projects is an object, convert it to an array
                    formattedProjects = Object.values(data.response).map(item => ({
                        taskId: item.taskId,     
                        title: item.title,
                        description: item.description,
                        startingDate: item.projectStarting,
                        endingDate: item.projectEnding,
                        instructorId:item.instructorId,
                        instructorName: data.response.names.instructorName,
                        leaderName: data.response.names.leaderName,
                        status: item.status


                        // Add other properties as needed
                    }));

                    console.log("obj")
                }

                console.log(formattedProjects);

                // Categorize projects into assigned and unassigned
                const assigned = formattedProjects.filter(project => project.title);
                setAssignedProjects(assigned);
            } else {
                console.error("Invalid response format or missing projects");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching Projects:", error);
            setLoading(false);
        }

    }; const changeStatus = async (taskId, instructorId) => {
        try {
            console.log("ids", traineeId.traineeId, instructorId, taskId);
            // Call the API to change the status
            const { data: changeStatusResponse } = await axios.post("http://localhost:3000/request/taskRequest", {
                traineeId: traineeId,
                instructorId: instructorId,
                taskId: taskId,
            });

            console.log("Change Status Response:", changeStatusResponse);

            // Show an alert after the request is sent
            alert("Your request has been sent!");

            // After changing the status, fetch both pending and in-request tasks again
            getAllProjects(1);
        } catch (error) {
            console.error("Error changing status:", error);
        }
    };



    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProjectForDelete, setSelectedProjectForDelete] = useState(null);
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setDimmed(false);
    };

    const handleDeleteClick = (project) => {
        setSelectedProjectForDelete(project);
        setDimmed(true);

        setDeleteModalOpen(true);
    };
    useEffect(() => {
        // Call getAllProjects with an initial page number when the component mounts
        getAllProjects(1);
    }, []);  // Include getAllProjects in the dependency array

    return (
        <div className="app">
            {loading ? <div className="flex ps-48 items-center justify-center h-screen">
                <div className="w-16 h-16  border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
            </div>
                : (
                    <div className="data-container">

                    <div className={`w-screen fade-in h-screen flex justify-end overflow-x-hidden scrollbar-hidden  ${showNotification ? 'blurr -z-50' : ''}`}>


                        <div className={`h-screen w-screen flex justify-end ${contentClassName}`}>
                            <div className=" ps-12 w-10/12 h-5/6">
                                <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                                    <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100">
                                        <li className="text-black flex items-center">
                                            <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Trainee</a>
                                        </li>
                                        <li className="flex items-center space-x-1">
                                            <span className="dark:text-gray-400">/</span>
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Task Details</a>
                                        </li>

                                    </ol>
                                    <h3 className="font-bold text-3xl">Task Details</h3>

                                </nav>

                                <div className="container p-2 mx-auto sm:p-4 text-black" >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">Tasks</h4>



                                    </div>

                                    <div className="overflow-x-auto shadow-md bg-white">
                                        <table className="w-full    text-sm border-collapse">
                                            <colgroup>
                                                {/* Add any column settings if needed */}
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500  text-white">
                                                    <th className="p-3 border border-gray-300">Task Name</th>
                                                    <th className="p-3 border border-gray-300">Task Description</th>
                                                    <th className="p-3 border border-gray-300">Task Status</th>
                                                    <th className="p-3 border border-gray-300">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignedProjects.map((project, index) => (
                                                    // Conditionally render rows based on the 'status' property
                                                    project.status === 'Pending' && (
                                                    <tr key={index}  className="border-gray-700 bg-white">
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.title}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.description}</p>
                                                        </td>
                                                     
                                                        <td className="p-3 border text-red-500 border-gray-300">
                                                            <p>{project.status}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300 text-center ">
                                                            <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer hover:bg-indigo-600 hover:shadow-md hover-effect"
                                                                >
                                                                    <span
                                                                        className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer hover:bg-indigo-600 hover:shadow-md hover-effect"
                                                                        onClick={() => changeStatus(project.taskId, project.instructorId)}
                                                                    >
                                                                        Change Status
                                                                    </span>
                                                         </span>
                                                        </td>
                                                    </tr>
                                                )
                                                ))}
                                            </tbody>
                                        </table>
                                        {assignedProjects.filter(project => project.status === 'Pending').length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-red-500">No pending tasks.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="container p-2 mx-auto sm:p-4 text-black" >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">Tasks In Request</h4>



                                    </div>

                                    <div className="overflow-x-auto shadow-md bg-white">
                                        <table className="w-full    text-sm border-collapse">
                                            <colgroup>
                                                {/* Add any column settings if needed */}
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500  text-white">
                                                    <th className="p-3 border border-gray-300">Task Name</th>
                                                    <th className="p-3 border border-gray-300">Task Description</th>
                                                    <th className="p-3 border border-gray-300">Task Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignedProjects.map((project, index) => (
                                                    // Conditionally render rows based on the 'status' property
                                                    project.status === 'In Request' && (
                                                        <tr key={index} className="border-gray-700 bg-white">
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.title}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.description}</p>
                                                        </td>

                                                        <td className="p-3 border 
                                                         text-red-500 border-gray-300">
                                                            <p>{project.status}</p>
                                                        </td>
                                                       
                                                    </tr>
                                                    )
                                                ))}
                                            </tbody>
                                        </table>
                                        {assignedProjects.filter(project => project.status === 'In Request').length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-red-500">No pending tasks.</p>
                                        )}
                                    </div>

                                </div>
                                <div className="container p-2 mx-auto sm:p-4 text-black" >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">Completed Tasks</h4>



                                    </div>

                                    <div className="overflow-x-auto shadow-md bg-white">
                                        <table className="w-full    text-sm border-collapse">
                                            <colgroup>
                                                {/* Add any column settings if needed */}
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500  text-white">
                                                    <th className="p-3 border border-gray-300">Task Name</th>
                                                    <th className="p-3 border border-gray-300">Task Description</th>
                                                    <th className="p-3 border border-gray-300">Task Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignedProjects.map((project, index) => (
                                                    // Conditionally render rows based on the 'status' property
                                                    project.status === 'Completed' && (
                                                        <tr key={index} className="border-gray-700 bg-white">
                                                            <td className="p-3 border border-gray-300">
                                                                <p>{project.title}</p>
                                                            </td>
                                                            <td className="p-3 border border-gray-300">
                                                                <p>{project.description}</p>
                                                            </td>

                                                            <td className="p-3 border  text-red-500 border-gray-300">
                                                                <p>{project.status}</p>
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                ))}
                                            </tbody>
                                        </table>
                                        {assignedProjects.filter(project => project.status === 'Completed').length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-red-500">No pending tasks.</p>
                                        )}
                                    </div>

                                </div>

                                    
                                <pre>{(Data, null)}</pre>

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Tasks;
