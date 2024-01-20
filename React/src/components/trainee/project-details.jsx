import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { createMemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Select from "react-select";
import Loader from '../loader_component';


function Project() {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [addData, setAddData] = useState({});


    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);

    const [selectedprojectId, setSelectedprojectId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);  // default page is 1
    const [data, setData] = useState(null);
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

    const [Projects, setProjects] = useState([]);
    const authCookie = Cookies.get('auth');

    // Find the position of "userId" in the string
    const userIdIndex = authCookie.indexOf('"userId":"');

    // Extract the userId value using substr and indexOf
    const start = userIdIndex + '"userId":"'.length;
    const end = authCookie.indexOf('"', start);
    const userId = authCookie.substring(start, end);

    console.log(userId); // This will log the userId value

    const getAllProjects = async (pageNo) => {
        try {
            console.log("pageNo", pageNo);
            setCurrentPage(pageNo);  // Update the currentPage state

            const { data } = await axios.get("http://localhost:3000/project/getAllProjects", {
                params: {
                    userId: userId,
                    pageNo: pageNo
                }

            });
            setData(data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
            console.log(data)
            if (data.response) {
                const formattedProjects = data.response.map(item => ({
                    title: item.title,
                    description: item.description,
                    projectId: item.projectId,
                    projectStarting: item.projectStarting,
                    projectEnding: item.projectEnding,
                    projectTag: item.projectTag,
                    status: item.status,
                    // Assuming there is a property indicating whether the project is assigned
                }));

                // Categorize projects into assigned and unassigned
                const assigned = formattedProjects.filter(project => project.projectTag === "Assigned");
                const unassigned = formattedProjects.filter(project => project.projectTag === "Unassigned");

                setAssignedProjects(assigned);
                setUnassignedProjects(unassigned);
            }
        } catch (error) {
            console.error("Error fetching Projects:", error);
            setLoading(false);
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
            {loading ? <Loader /> : (
                <div className="data-container">
                    <div className='className="h-screen w-screen flex justify-center items-center my-8"'>
                        

                        <div className={`h-screen w-screen flex justify-end ${contentClassName}`}>
                            <div className=" ps-12 w-10/12 h-5/6">
                                <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                                    <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100">
                                        <li className="text-black flex items-center">
                                            <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Trainee</a>
                                        </li>
                                        <li className="flex items-center space-x-1">
                                            <span className="dark:text-gray-400">/</span>
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Project Details</a>
                                        </li>

                                    </ol>
                                    <h3 className="font-bold text-3xl">Project Details</h3>

                                </nav>

                                <div className="container p-2 mx-auto sm:p-4 text-black" >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">Project:</h4>



                                    </div>

                                    <div className="overflow-x-auto shadow-md w-11/12 bg-white">
                                        <table className="w-full text-sm border-collapse">
                                            <colgroup>
                                                {/* Add any column settings if needed */}
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500 text-sm text-white">
                                                    <th className="p-3 border border-gray-300">Project Name</th>
                                                    <th className="p-3 border border-gray-300">Description</th>
                                                    <th className="p-3 border border-gray-300">Starting Date</th>
                                                    <th className="p-3 border border-gray-300">Ending Date</th>
                                                    <th className="p-3 border border-gray-300">Project Leader</th>
                                                    <th className="p-3 border border-gray-300">Project Instructor</th>



                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignedProjects.map((project, index) => (

                                                    <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.title}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.description}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.projectStarting}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.projectStarting}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.projectStarting}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.projectStarting}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {assignedProjects.length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-red-500">No project data yet.</p>
                                        )}
                                    </div>

                                </div>
                               
                                <div className="container p-2 mx-auto sm:p-4 text-black" >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">All Members:</h4>
                                       


                                    </div>
                                    
                                    <div className="overflow-x-auto shadow-md w-11/12 bg-white">
                                        <table className="w-full text-sm border-collapse">
                                            <colgroup>
                                                {/* Add any column settings if needed */}
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500 text-sm text-white">
                                                    <th className="p-3 border border-gray-300">Full Name</th>
                                                    <th className="p-3 border border-gray-300">Cohort</th>
                                                    <th className="p-3 border border-gray-300">Stack</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignedProjects.map((project, index) => (

                                                    <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.title}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.description}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.projectStarting}</p>
                                                        </td>
                                                       
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {assignedProjects.length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-red-500">No project data yet.</p>
                                        )}
                                    </div>
                                   
                                   </div>
                                <pre>{(data, null)}</pre>

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Project;
