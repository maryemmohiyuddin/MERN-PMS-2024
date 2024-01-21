import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../loader_component';
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { createMemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Select from "react-select";




function Task({ updateState, showNotification,instructorId }) {


    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [addData, setAddData] = useState({});


    const [isModalOpen, setModalOpen] = useState(false);
    const [isDimmed, setDimmed] = useState(false);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);




    const [localSelectedTeamMembers, setLocalSelectedTeamMembers] = useState([]);

    const [currentTask, setCurrentTask] = useState(null);
    const [editData, setEditData] = useState(null);

    const handleEditClick = (task) => {
        setCurrentTask(task);
        setEditData(task);
        setEditModalOpen(true);
        setDimmed(true);
    };
    const [selectedTeamMemberId, setSelectedTeamMemberId] = useState(null);
    const [selectedProjectIdForTask, setSelectedProjectIdForTask] = useState(null);

    const handleAddClick = (teamMemberId) => {
        // setCurrentproject(projectId);
        setAddData({});
        setLocalSelectedTeamMembers([]);
        setAddModalOpen(true);
        setDimmed(true);

        // Set the selected team member's ID
        setSelectedTeamMemberId(teamMemberId);

        // Log the selected team member's ID
        console.log("Selected Team Member ID:", teamMemberId);
    };



    const handleEditAction = () => {
        setEditModalOpen(false);
        setDimmed(false);
    };
    const handleAddAction = () => {

        const isAllMembersSelected = localSelectedTeamMembers.every((member) => member !== null);

        if (addData.title === null || addData.description === null || !selectedProjectId || !selectedTeamMemberId) {
            alert("Please select all team members, team leader, and project");
            return;
        }
        console.log("Selected Project ID in addAction:", selectedProjectId);
        console.log("Selected Team Member ID in addAction:", selectedTeamMemberId);
        create({
            projectId: selectedProjectId,
            teamMemberId: selectedTeamMemberId,
            taskTitle: addData.title, // Include taskTitle from addData
            taskDes: addData.description, // Include taskDes from addData
            instructorId: instructorId
        });

        setAddModalOpen(false);
        setDimmed(false);
    };

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedTeamIdForDelete, setSelectedTeamIdForDelete] = useState(null);

    const handleCloseTeamModal = () => {
        setAddModalOpen(false);
        setDeleteModalOpen(false);

        setDimmed(false);
    };

    const handleDeleteClick = (taskId) => {
        setDimmed(true);
        setSelectedTeamIdForDelete(taskId);
        setDeleteModalOpen(true);
    };

    const handleDeleteAction = (taskId) => {
        setDimmed(false);
        setSelectedTeamIdForDelete(taskId);
        setDeleteModalOpen(false);
    };
    const handleProjectClick = async (projectId) => {
        try {
            await getTeamByProjectId(projectId);

            // Save the selected project ID
            setSelectedProjectId(projectId);

            // Log the selected project ID
            console.log("Selected Project ID:", projectId);
        } catch (error) {
            console.error("Error handling project click:", error);
        }
    };


    const contentClassName = isDimmed ? 'dimmed' : '';
    const [Teams, setTeams] = useState([]);

    const [teamMembers, setTeamMembers] = useState([]);
    const [insProjects, setInsProjects] = useState([]);


    const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
    const [teamLeader, setTeamLeader] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const handleMemberSelect = (selectedOption, index) => {
        setLocalSelectedTeamMembers(prev => {
            const newSelectedMembers = [...prev];
            newSelectedMembers[index] = selectedOption ? selectedOption.value : null;
            return newSelectedMembers;
        });

        setSelectedTeamMembers(prev => {
            const newSelectedMembers = [...prev];
            newSelectedMembers[index] = selectedOption ? selectedOption.value : null;
            return newSelectedMembers;
        });
    }; const create = async (createdData) => {
        try {
            console.log("hh", createdData)
            const requestData = {
                projectId: selectedProjectId,
                teamMemberId: selectedTeamMemberId,
                title: createdData.taskTitle,  // Use the captured team member ID
                description: createdData.taskDes,  // Use the captured project ID
                instructorId: instructorId,
                // 
            };
            console.log(requestData)
            const { data } = await axios.post("http://localhost:3000/task/createTask", requestData);
            console.log(data);

            getAllTeams();  // Assuming you have a function to fetch all tasks
            // Additional actions after creating the task if needed
        } catch (error) {
            console.error("Error creating Task:", error);
        }
    };


    const update = async (updatedData) => {
        try {
            const { taskId, taskTitle, taskDes, status, ...dataToSend } = updatedData;

            const { data } = await axios.put("http://localhost:3000/task/updateTask", {
                taskId,
                 title: taskTitle,
                  description: taskDes, 
                  status


            });
            setTeams(prevTeams => {
                const updatedIndex = prevTeams.findIndex(Team => Team.taskId === updatedData.taskId);
                if (updatedIndex !== -1) {
                    const updatedTeams = [...prevTeams];
                    updatedTeams[updatedIndex] = updatedData;
                    return updatedTeams;
                }
                return prevTeams;
            });

            console.log(dataToSend);
            console.log(data);


            // // Update the respective state based on 'isAssigned' flag
            // setData(prevProjects => {
            //     const updatedIndex = prevProjects.findIndex(project => project.projectId === updatedData.projectId);
            //     if (updatedIndex !== -1) {
            //         const updatedProjects = [...prevProjects];
            //         updatedProjects[updatedIndex] = updatedData;
            //         return updatedProjects;
            //     }
            //     return prevProjects;
            // });
            // setUnassignedProjects(prevProjects => {
            //     const updatedIndex = prevProjects.findIndex(project => project.projectId === updatedData.projectId);
            //     if (updatedIndex !== -1) {
            //         const updatedProjects = [...prevProjects];
            //         updatedProjects[updatedIndex] = updatedData;
            //         return updatedProjects;
            //     }
            //     return prevProjects;
            // });


        } catch (error) {
            console.error("Error updating task:", error);
        }
    };


    const getAllTeams = async () => {
        try {
            
            const response = await axios.get("http://localhost:3000/task/getAllTasks", {
                params: {
                    instructorId: instructorId
                }
            });

            if (response && response.data && Array.isArray(response.data.response)) {
                // console.log("response", response)
                // console.log("response,data", response.data)
                // console.log("response.data.response", response.data.response)

                const mappedTeams = response.data.response.map(team => ({
                    ...team,
                    projectTitle: team.project.title,
                    MemberName: team.user.firstName + team.user.lastName,
                    taskTitle: team.taskTitle,
                    taskDes: team.taskDes,
                    taskId: team.taskId,
                    status: team.status
                }));
                setTeams(mappedTeams);
            } else {
                console.error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching Teams:", error);
        }
    };

    const [memberOptions, setMemberOptions] = useState([]);

    const getTeamMembers = async () => {
        try {
            console.log(instructorId)
            const { data } = await axios.get("http://localhost:3000/team/getAllMembers", {
                params: {
                    instructorId: instructorId
                }
            });
            // console.log("r", data.response);
            setTeamMembers(data.response);
            setMemberOptions(data.response.map(user => ({
                value: user.userId,
                label: `${user.firstName} ${user.lastName}`
            })

            ));
            const filteredMembers = data.response.filter(user => !selectedUsers.includes(user.userId));
            setTeamMembers(filteredMembers);

            const filteredOptions = filteredMembers.map(user => ({
                value: user.userId,
                label: `${user.firstName} ${user.lastName}`
            }));
            setMemberOptions(filteredOptions);

        } catch (error) {
            console.error("Error fetching Teams:", error);
        }
    };
    const getInsProjects = async () => {
        try {
            // console.log(instructorId)
            const { data } = await axios.get("http://localhost:3000/project/getInsProjects", {
                params: {
                    instructorId: instructorId,
                    projectTag: 'Assigned'

                }
            });
            // console.log("r", data.response);
            setInsProjects(data.response.map(user => ({
                value: user.projectId,
                label: user.title
            })));


        } catch (error) {
            console.error("Error fetching Teams:", error);
        }
    };

    const getTeamByProjectId = async (projectId) => {
        try {
            const { data } = await axios.get("http://localhost:3000/team/getTeamByProjectId", {
                params: {
                    projectId: projectId
                }
            });
            // console.log("Teams for project ID", projectId, ":", data.response);
            setData(data.response);
        } catch (error) {
            console.error("Error fetching Teams by Project ID:", error);
        }
    };



    const deleteTeam = async (taskId) => {
        try {
            // console.log("taskId", taskId);
            const { data } = await axios.delete("http://localhost:3000/task/deleteTask", {
                params: {
                    taskId: taskId
                }
            });
            // console.log("Response:", data);

            setTeams(prevTeams => prevTeams.filter(team => team.taskId !== taskId));
        } catch (error) {
            console.error("Error deleting Team:", error);
            alert("Failed to delete team. Please try again.");
        }
    };

    const handleTeamLeaderSelect = (selectedOption) => {
        setTeamLeader(selectedOption ? selectedOption.value : null);
    };



 useEffect(() => {
        const fetchData = async () => {
            try {

                // Fetch the teams for project ID 1
                await getTeamByProjectId();
                await getInsProjects();

                // // Fetch all teams
                await getAllTeams();

                // Fetch team members
                await getTeamMembers();

                // Fetch instructor projects
                setLoading(false)

                // Set loading to false when all data has been fetched
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        // Wrap fetchData in a setTimeout to ensure it runs after the initial rendering
        setTimeout(fetchData);
    }, []);


    useEffect(() => {

        // Check if insProjects has at least one project
        if (insProjects.length > 0) {
            // Set the selectedProjectId to the ID of the first project
            setSelectedProjectId(insProjects[0].value);

            // Fetch teams for the first project
            handleProjectClick(insProjects[0].value);
        }

        // ... (the rest of your useEffect logic)
    }, [insProjects]);


    return (
        <div className="app">
            {loading ? <Loader /> : (
                <div className="data-container">
                    <div className={`className="h-screen w-screen flex  justify-end ${showNotification ? 'blurr -z-50' : ''}`}>
                        {isEditModalOpen && (
                            <div className="modal-container  flex items-center justify-center z-100">
                                <div className="absolute  bg-black opacity-50" onClick={() => setEditModalOpen(false)}></div>
                                <div className="flex flex-col w-form gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="text-xl font-semibold text-center leading tracking">
                                        Edit Task
                                    </h2>
                                    <div className="mt-4">
                                        <label htmlFor="Title">Title</label><br />

                                        <input
                                            type="text"
                                            value={editData.taskTitle || ''}
                                            onChange={(e) => setEditData(prev => ({ ...prev, taskTitle: e.target.value }))}
                                            placeholder="Title"
                                            className="border w-full p-2 mb-2"

                                        /><br />
                                        <label htmlFor="Description">Description</label><br />
                                        <input
                                            type="text"
                                            value={editData.taskDes || ''}
                                            onChange={(e) => setEditData(prev => ({ ...prev, taskDes: e.target.value }))}
                                            placeholder="Description"
                                            className="border p-2 w-full mb-2"
                                        /><br />


                                        <label htmlFor="Status">Status</label><br />
                                        <Select
                                            value={{ label: editData.status || '', value: editData.status || '' }}
                                            onChange={(selectedOption) => setEditData(prev => ({ ...prev, status: selectedOption.value }))}
                                            options={[{ label: 'Pending', value: 'Pending' }, { label: 'Completed', value: 'Completed' }]}
                                        />
                                        <br />


                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleEditAction}>Close</button>
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2" onClick={() => { handleEditAction(); update(editData); }}>Add</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isAddModalOpen && (
                            <div className="modal-container  flex items-center justify-center z-100">
                                <div className="absolute  bg-black opacity-50" onClick={() => setAddModalOpen(false)}></div>
                                <div className="flex flex-col w-form gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="text-xl font-semibold text-center leading tracking">
                                        Add Task
                                    </h2>
                                    <div className="mt-4">
                                        <div >
                                            <label htmlFor="Task Title">Task Title</label><br />

                                            <input
                                                type="text"

                                                onChange={(e) => setAddData(prev => ({ ...prev, title: e.target.value }))}
                                                placeholder="Enter Task Title"
                                                className="border w-full p-2 mb-2"

                                            />


                                            <br />
                                            <label htmlFor="Task Des">Task Description</label><br />

                                            <input
                                                type="text"

                                                onChange={(e) => setAddData(prev => ({ ...prev, description: e.target.value }))}
                                                placeholder="Enter Task Description"
                                                className="border w-full p-2 mb-2"

                                            /><br />



                                        </div>




                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseTeamModal}>Close</button>
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2"
                                            onClick={() => {

                                                handleAddAction();

                                            }}>
                                            Save
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )}
                        {isDeleteModalOpen && (
                            <div className="modal-container flex items-center justify-center z-100">
                                <div className="absolute bg-black opacity-50" onClick={handleCloseTeamModal}></div>
                                <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="flex items-center gap-2 text-xl font-semibold leadi tracki">
                                        <span className=''>Are you sure you want to delete this team?</span>
                                    </h2>
                                    <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                        <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseTeamModal}>
                                            Close
                                        </button>
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleDeleteAction(); deleteTeam(selectedTeamIdForDelete); }}>
                                            Delete Team
                                        </button>
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
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Tasks</a>
                                        </li>

                                    </ol>
                                    <h3 className="font-bold text-3xl">Tasks</h3>

                                </nav>
                                <div className="container p-2 mx-auto sm:p-4 text-black">
                                    <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">Select Projects:</h4>

                                    <div className="flex">
                                        <div className="w-1/4 me-7">
                                            <ul className="list-group shadow-md">
                                            </ul>

                                            {insProjects.map((project, index) => (
                                                <li
                                                    key={index}
                                                    className={`list-group-item bg-white text-black cursor-pointer hover:bg-indigo-500 hover:text-white text-sm list-none font-semibold border border-gray-200 p-3 ${project.value === selectedProjectId ? 'selected' : ''}`}
                                                    onClick={() => handleProjectClick(project.value)}
                                                >
                                                    {project.label}
                                                </li>
                                            ))}


                                        </div>

                                        <div className='w-4/6'>
                                            <div className="overflow-x-auto shadow-md w-11/12 bg-white">
                                                <table className="w-full text-sm border-collapse">
                                                    <thead className="bg-white">
                                                        <tr className="bg-indigo-500 text-sm text-white">
                                                            <th className="p-3 border border-gray-300">Team Members</th>
                                                            <th className="p-3 border border-gray-300">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {data && Array.isArray(data) && data.length > 0 ? (
                                                            data.map((team, index) => (
                                                                <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                                                    <td className="border border-gray-300 bg-white px-4 py-2">
                                                                        <div key={index}>{`${team.firstName} ${team.lastName}`}</div>
                                                                    </td>
                                                                    <td className="p-3 border border-gray-300 text-center">
                                                                        <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer"
                                                                            onClick={() => handleAddClick(team.teamMemberId)}>
                                                                            <span>Assign Task</span>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="2" className="text-left mt-4 ms-3 text-red-500">No Team data yet.</td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="flex justify-between items-center">


                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">All Tasks:</h4>


                                    </div>
                                    <div className="overflow-x-auto shadow-md w-11/12 bg-white">
                                        <table className="w-full text-sm border-collapse">
                                            <colgroup>
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500 text-sm text-white">
                                                    <th className="p-3 border border-gray-300">Task Name</th>
                                                    <th className="p-3 border border-gray-300">Task Description</th>
                                                    <th className="p-3 border border-gray-300">Project Name</th>
                                                    <th className="p-3 border border-gray-300">Member Name</th>
                                                    <th className="p-3 border border-gray-300">Status</th>

                                                    <th className="p-3 border border-gray-300">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Teams.map((team, index) => (

                                                    <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                                        <td className="border border-gray-300 bg-white px-4 py-2"> {team.taskTitle}</td>
                                                        <td className="border border-gray-300 bg-white px-4 py-2">{team.taskDes}</td>
                                                        <td className="border border-gray-300 bg-white px-4 py-2">{team.projectTitle}</td>
                                                        <td className="border border-gray-300 bg-white px-4 py-2">{team.MemberName}</td>
                                                        <td className="border border-gray-300 text-indigo-600 font-semibold bg-white px-4 py-2">{team.status}</td>



                                                        <td className="p-3 border border-gray-300">
                                                            <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer" onClick={() => handleEditClick(team)}>
                                                                <span>Edit</span>
                                                            </span>
                                                            <span className="px-3 py-2 ms-2 text-white rounded-md bg-red-500 cursor-pointer" onClick={() => handleDeleteClick(team.taskId)}>
                                                                <span>Delete</span>
                                                            </span>

                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                        {Teams.length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-red-500">No Team data yet.</p>
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

export default Task;
