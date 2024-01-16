import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../loader_component';
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { createMemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Select from "react-select";



function EditTeam({  }) {

    const [selectedTeamId, setSelectedTeamId] = useState(null);

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
    const handleEditClick = (team) => {
        // setCurrentproject(team);
        // setEditData(team);
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
            alert("Please fill in all required fields before adding a team.");
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


    const [Projects, setProjects] = useState([]);


    // Extract the userId value using substr and indexOf






    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProjectForDelete, setSelectedProjectForDelete] = useState(null);
    const handleCloseTeamModal = () => {
        setAddModalOpen(false);
        setDimmed(false);
    };



    const handleDeleteClick = (project) => {
        setSelectedProjectForDelete(project);
        setDimmed(true);

        setDeleteModalOpen(true);
    };





    const [currentTeam, setCurrentTeam] = useState(null);

    const contentClassName = isDimmed ? 'dimmed' : '';
    const [Teams, setTeams] = useState([]);

    const [teamMembers, setTeamMembers] = useState([]);
    const [insProjects, setInsProjects] = useState([]);



    const update = async (updatedData) => {
        try {

            const { data } = await axios.put("http://localhost:3000/Team/updateTeam", updatedData);
            console.log(data);

            // Update the Teams state with the updated data
            setTeams(prevTeams => {
                const updatedIndex = prevTeams.findIndex(Team => Team.email === updatedData.email);
                if (updatedIndex !== -1) {
                    const updatedTeams = [...prevTeams];
                    updatedTeams[updatedIndex] = updatedData;
                    return updatedTeams;
                }
                return prevTeams;
            });

        } catch (error) {
            console.error("Error updating Team:", error);
        }
    }
    const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
    const [teamLeader, setTeamLeader] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleMemberSelect = (selectedOption, index) => {
        setSelectedTeamMembers(prev => {
            const newSelectedMembers = [...prev];
            newSelectedMembers[index] = selectedOption.value;
            return newSelectedMembers;
        });
    };


    const create = async () => {
        try {
            const requestData = {
                userId: selectedTeamMembers.filter(member => member !== null),
                leaderId: teamLeader,
                projectId: selectedProjectId,
                instructorId: instructorId
            };

            const { data } = await axios.post("http://localhost:3000/team/createTeam", requestData);
            console.log(data.response);

            // Add the new team to the state
            getAllTeams();
            getTeamMembers();

        } catch (error) {
            console.error("Error creating Team:", error);
        }
    };


    const getAllTeams = async () => {
        try {
            const response = await axios.get("http://localhost:3000/team/getAllTeams", {
                params: {
                    instructorId: instructorId
                }
            });

            if (response && response.data && Array.isArray(response.data.response)) {
                console.log("response", response)
                console.log("response,data", response.data)
                console.log("response.data.response", response.data.response)

                // Assuming you have a function to convert IDs to names for all teams
                const mappedTeams = response.data.response.map(team => ({
                    ...team,
                    // Convert IDs to names if needed
                    leaderName: team.leaderName, // Replace with actual conversion logic
                    projectTitle: team.projectTitle
                    // Replace with actual conversion logic
                })); console.log("mapped", mappedTeams)
                // Update the Teams state with the fetched and mapped data
                setTeams(mappedTeams);
                setLoading(false);
            } else {
                console.error("Invalid response format");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching Teams:", error);
            setLoading(false);
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
            console.log("r", data.response);
            setTeamMembers(data.response);
            // Assuming data.response is the array you mentioned
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
            // Now, use this options array in your dropdown
            // Set team members to the state
        } catch (error) {
            console.error("Error fetching Teams:", error);
            setLoading(false);
        }
    };
    const getInsProjects = async () => {
        try {
            console.log(instructorId)
            const { data } = await axios.get("http://localhost:3000/project/getInsProjects", {
                params: {
                    instructorId: instructorId
                }
            });
            console.log("r", data.response);
            // Assuming data.response is the array you mentioned
            setInsProjects(data.response.map(user => ({
                value: user.projectId,
                label: user.title
            })));

            // Now, use this options array in your dropdown
            // Set team members to the state
        } catch (error) {
            console.error("Error fetching Teams:", error);
            setLoading(false);
        }
    };


    const blockUser = async (Team) => {
        try {
            const { data } = await axios.put("http://localhost:3000/user/updateUser", {
                userId: Team,
                isBlocked: true
            });
            console.log(data.response)
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };



    // Update the memberOptions for all dropdowns



    useEffect(() => {
        getAllTeams(1);
        getTeamMembers();
        getInsProjects();  // Call getTeamMembers here
        // Call getTeamMembers here
    }, []);  // Include getTeamMembers in the dependency array
    // Include getAllTeams in the dependency array

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
                                        Edit Team
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
                                        Add Team
                                    </h2>
                                    <div className="mt-4">
                                        {/* Here you can have your edit form fields */}
                                        {/* For example: */}
                                        {[...Array(4)].map((_, index) => (
                                            <div key={index}>
                                                <label htmlFor={`teammember-${index}`}>{`${index + 1}st Team Member`}</label><br />
                                                <Select
                                                    id={`teammember-${index}`}
                                                    className="bg-white rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                    isSearchable={true}
                                                    isDisabled={false}
                                                    placeholder={`Select ${index + 1}st team member`}
                                                    options={memberOptions}
                                                    onChange={(selectedOption) => handleMemberSelect(selectedOption, index)}
                                                />


                                            </div>
                                        ))} <label htmlFor="teammember">Select team Leader</label><br />
                                        <Select
                                            className="bg-white  rounded-lg mb-2 focus:outline-none text-black font-medium"
                                            isSearchable={true}

                                            isDisabled={false}
                                            placeholder="Select team leader"
                                            options={memberOptions}
                                            onChange={(selectedOption) => setTeamLeader(selectedOption.value)}


                                        />
                                        <label htmlFor="project">Select Project</label><br />
                                        <Select
                                            className="bg-white  rounded-lg mb-2 focus:outline-none text-black font-medium"
                                            isSearchable={true}
                                            options={insProjects}
                                            isDisabled={false}
                                            placeholder="Select project"
                                            onChange={(selectedOption) => setSelectedProjectId(selectedOption.value)}

                                        />



                                        {/* ... other fields */}
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseTeamModal}>Close</button>
                                        <button className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2"
                                            onClick={() => {
                                                console.log("Selected Team Members:", selectedTeamMembers.filter(member => member !== null));
                                                console.log("Team Leader ID:", teamLeader);
                                                console.log("Selected Project ID:", selectedProjectId);
                                                console.log("Instructor ID:", instructorId);
                                                handleAddAction();
                                                create({
                                                    userId: selectedTeamMembers.filter(member => member !== null), // Remove any null values
                                                    leaderId: teamLeader,
                                                    projectId: selectedProjectId,
                                                    instructorId: instructorId
                                                });
                                            }}>
                                            Save
                                        </button>

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
                                        {Teams.map((Team, index) => (
                                            <div key={index}> {selectedTeamId === Team.userId ? (
                                                <button className="px-6 py-2 mr-5 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleCloseModal}>Close</button>

                                            ) : null}
                                                {selectedTeamId === Team.userId ? (
                                                    <button className="px-6 py-2 rounded-sm shadow-sm bg-red-500 text-white" onClick={() => { handleCloseModal(); blockUser(Team.userId); }}>Change Status</button>
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
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Teams</a>
                                        </li>
                                        <li className="flex items-center space-x-1">
                                            <span className="dark:text-gray-400">/</span>
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Edit Team</a>
                                        </li>

                                    </ol>
                                    <h3 className="font-bold text-3xl">Teams</h3>

                                </nav>
                                <div className="container p-2 mx-auto sm:p-4 text-black" >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg mb-4 ms-2 mt-5">All Teams:</h4>
                                        <button
                                            type="button"
                                            className="px-5 py-2 me-28 bg-indigo-500 text-white rounded-full dark:bg-gray-100 dark:text-gray-800"
                                            onClick={() => handleAddClick(Teams[0])}
                                        >
                                            Add Team
                                        </button>


                                    </div>
                                    <div className="overflow-x-auto shadow-md w-11/12 bg-white">
                                        <table className="w-full text-sm border-collapse">
                                            <colgroup>
                                                {/* Add any column settings if needed */}
                                            </colgroup>
                                            <thead className="bg-white">
                                                <tr className="bg-indigo-500 text-sm text-white">
                                                    <th className="p-3 border border-gray-300">Team Leader</th>
                                                    <th className="p-3 border border-gray-300">Project Title</th>
                                                    <th className="p-3 border border-gray-300">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Teams.map((team, index) => (

                                                    <tr key={index} className="border-b border-opacity-20 border-gray-700 bg-white">
                                                        <td className="border border-gray-300 bg-white px-4 py-2"> {team.leaderName}</td>
                                                        <td className="border border-gray-300 bg-white px-4 py-2">{team.projectTitle}</td>
                                                        <td className="p-3 border border-gray-300">
                                                            <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer" onClick={() => handleEditClick(Team)}>
                                                                <span>Edit</span>
                                                            </span>
                                                            <span className="px-3 py-2 ms-2 text-white rounded-md bg-red-500 cursor-pointer" onClick={() => handleBlockClick(Team)}>
                                                                <span>Change Status</span>
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
                                    {/* <div className="flex justify-end me-28 space-x-1 mt-3 dark:text-gray-100">
                                        <button type="button" onClick={() => getAllTeams(1)} title="Page 1" className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400">1</button>
                                        <button type="button" onClick={() => getAllTeams(2)} className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 2">2</button>
                                        <button type="button" onClick={() => getAllTeams(3)} className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 3">3</button>
                                        <button type="button" onClick={() => getAllTeams(4)} className="bg-white inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 4">4</button>
                                    </div> */}
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

export default EditTeam;
