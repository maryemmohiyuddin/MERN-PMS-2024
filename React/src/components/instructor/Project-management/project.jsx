import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../loader_component';
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { createMemoryRouter } from 'react-router-dom';


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


    const handleEditAction = () => {
        setEditModalOpen(false);
        setDimmed(false);
    };
    const handleAddAction = () => {
        setAddModalOpen(false);
        setDimmed(false);
    };

    const contentClassName = isDimmed ? 'dimmed' : '';

    const [Projects, setProjects] = useState([]);

    const update = async (updatedData) => {
        try {

            const { data } = await axios.put("http://localhost:3000/project/updateProject", updatedData);
            console.log(data);

            // Update the Projects state with the updated data
            setProjects(prevProjects => {
                const updatedIndex = prevProjects.findIndex(project => project.email === updatedData.email);
                if (updatedIndex !== -1) {
                    const updatedProjects = [...prevProjects];
                    updatedProjects[updatedIndex] = updatedData;
                    return updatedProjects;
                }
                return prevProjects;
            });

        } catch (error) {
            console.error("Error updating project:", error);
        }
    }
    const create = async (createdData) => {
        try {
            const { projectId, ...dataWithoutId } = createdData;  // Remove projectId if exists

            const { data } = await axios.post("http://localhost:3000/project/createProject", dataWithoutId);
            console.log(data);

            // Add the new project to the local state
            setProjects(prevProjects => [...prevProjects, dataWithoutId]); // Assuming `data` contains the newly created project details

        } catch (error) {
            console.error("Error creating project:", error);
        }
    }




    const getAllProjects = async (pageNo) => {
        try {
            console.log("pageNo", pageNo);
            setCurrentPage(pageNo);  // Update the currentPage state

            const { data } = await axios.get("http://localhost:3000/project/getAllProjects", {
                params: {
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
                    projectId: item.projectId
                }));
                setProjects(formattedProjects);
            }
        } catch (error) {
            console.error("Error fetching Projects:", error);
            setLoading(false);
        }
    };


    const blockUser = async (project) => {
        try {
            const { data } = await axios.put("http://localhost:3000/user/updateUser", {
                userId: project,
                isBlocked: true
            });
            console.log(data.response)
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };


    const handleBlockClick = (project) => {
        setSelectedprojectId(project.userId);
        setModalOpen(true);
        setDimmed(true);
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
                        {isEditModalOpen && (
                            <div className="modal-container  flex items-center justify-center z-100">
                                <div className="absolute  bg-black opacity-50" onClick={() => setEditModalOpen(false)}></div>
                                <div className="flex flex-col w-form gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="text-xl font-semibold text-center leading tracking">
                                        Edit project
                                    </h2>
                                    <div className="mt-4">
                                        {/* Here you can have your edit form fields */}
                                        {/* For example: */}
                                        <label htmlFor="Title">Title</label><br />

                                        <input
                                            type="text"
                                            value={editData.title || ''}
                                            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Title"
                                            className="border w-full p-2 mb-2"

                                        /><br />
                                        <label htmlFor="Description">Description</label><br />
                                        <input
                                            type="text"
                                            value={editData.description || ''}
                                            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Description"
                                            className="border p-2 w-full mb-2"
                                        /><br />

                                        {/* ... other fields */}
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleEditAction}>Close</button>
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2" onClick={() => { handleEditAction(); update(editData); }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isAddModalOpen && (
                            <div className="modal-container  flex items-center justify-center z-100">
                                <div className="absolute  bg-black opacity-50" onClick={() => setAddModalOpen(false)}></div>
                                <div className="flex flex-col w-form gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="text-xl font-semibold text-center leading tracking">
                                        Add project
                                    </h2>
                                    <div className="mt-4">
                                        {/* Here you can have your edit form fields */}
                                        {/* For example: */}
                                        <label htmlFor="Title">Title</label><br />

                                        <input
                                            type="text"
                                            value={addData.title || ''}
                                            onChange={(e) => setAddData(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Title"
                                            className="border w-full p-2 mb-2"
                                        /><br />
                                        <label htmlFor="Description">Description</label><br />
                                        <input
                                            type="text"
                                            value={addData.description || ''}
                                            onChange={(e) => setAddData(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Description"
                                            className="border p-2 w-full mb-2"
                                        /><br />

                                        {/* ... other fields */}
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleAddAction}>Close</button>
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2" onClick={() => { handleAddAction(); create(addData); }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isModalOpen && (
                            <div className="modal-container flex items-center justify-center z-100">
                                <div className="absolute  bg-black opacity-50" onClick={handleCloseModal}></div>
                                <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="flex items-center gap-2 text-xl font-semibold leadi tracki">
                                        <span className=''>Are you sure you want to block this user?</span>
                                    </h2>
                                    <p className="flex-1 dark:text-gray-400">By blocking this user, they will no longer be able to interact with you or view your content.</p>
                                    <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                        {Projects.map((project, index) => (
                                            <div key={index}> {selectedprojectId === project.userId ? (
                                                <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseModal}>Close</button>

                                            ) : null}
                                                {selectedprojectId === project.userId ? (
                                                    <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleCloseModal(); blockUser(project.userId); }}>Change Status</button>
                                                ) : null}
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={`h-screen w-screen flex justify-end ${contentClassName}`}>
                            <div className=" ps-12 w-10/12 h-5/6">
                                <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                                    <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100">
                                        <li className="text-black flex items-center">
                                            <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                                        </li>
                                        <li className="flex items-center space-x-1">
                                            <span className="dark:text-gray-400">/</span>
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Projects</a>
                                        </li>

                                    </ol>
                                    <h3 className="font-bold text-3xl">Projects</h3>

                                </nav>
                                <div className="container p-2 mx-auto sm:p-4 text-black" >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">All Projects:</h4>
                                        <button
                                            type="button"
                                            className="px-5 py-2 me-28 bg-indigo-500 text-white rounded-full dark:bg-gray-100 dark:text-gray-800"
                                            onClick={() => handleAddClick(Projects[0])}
                                        >
                                            Add Project
                                        </button>


                                    </div>
                                    <div className="overflow-x-auto shadow-md w-11/12 bg-white">
                                        <table className="w-full text-sm border-collapse">
                                            <colgroup>
                                                {/* Add any column settings if needed */}
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500 text-sm text-white">
                                                    <th className="p-3 border border-gray-300">Project Title</th>
                                                    <th className="p-3 border border-gray-300">Description</th>
                                                    <th className="p-3 border border-gray-300">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Projects.map((project, index) => (

                                                    <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.title}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <p>{project.description}</p>
                                                        </td>
                                                        <td className="p-3 border border-gray-300">
                                                            <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer" onClick={() => handleEditClick(project)}>
                                                                <span>Edit</span>
                                                            </span>
                                                            <span className="px-3 py-2 ms-2 text-white rounded-md bg-red-500 cursor-pointer" onClick={() => handleBlockClick(project)}>
                                                                <span>Change Status</span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {Projects.length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-red-500">No project data yet.</p>
                                        )}
                                    </div>
                                    <div className="flex justify-end me-28 space-x-1 mt-3 dark:text-gray-100">
                                        <button type="button" onClick={() => getAllProjects(1)} title="Page 1" className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400">1</button>
                                        <button type="button" onClick={() => getAllProjects(2)} className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 2">2</button>
                                        <button type="button" onClick={() => getAllProjects(3)} className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 3">3</button>
                                        <button type="button" onClick={() => getAllProjects(4)} className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 4">4</button>
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
