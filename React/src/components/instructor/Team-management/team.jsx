import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../loader_component';
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { createMemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import Select from "react-select";




function Team({ updateState,showNotification,instructorId }) {
   
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    const [isViewModalOpen, setViewModalOpen] = useState(false);
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


    const [localSelectedTeamMembers, setLocalSelectedTeamMembers] = useState([]);

    const [currentproject, setCurrentproject] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);
    const [isLoadingView, setIsLoadingView] = useState(false);

    const handleViewClick = async (teamId) => {
                try {
            // Set loading to true when initiating the API call
                    setIsLoadingView(true);
                    setDimmed(true)

            // Call the getMembers API
            const response = await axios.get("http://localhost:3000/team/getTeamMembers", {
                params: {
                    teamId: teamId
                }
            });
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // Once the data is loaded or operation is complete, open the modal
                    setIsLoadingView(false);
            // Update the state with the fetched data
            setViewData(response.data.response);

            // Set loading to false once the data is fetched

            // Open the view modal
            setViewModalOpen(true);
            setDimmed(true);
        } catch (error) {
            console.error("Error fetching team members:", error);
            // Handle the error and set loading to false
            setViewLoading(false);
        }
    };

    const handleAddClick = (project) => {
        setCurrentproject(project);
        setAddData({}); // Clear previous data
        setLocalSelectedTeamMembers([]); // Reset local state
        setAddModalOpen(true);
        setDimmed(true);
    };

    const handleViewAction = () => {
        setViewModalOpen(false);
        setDimmed(false);
    }; const handleAddAction = () => {
        // Check if all team members are selected
        const isAllMembersSelected = localSelectedTeamMembers.every(member => member !== null);

        if (!isAllMembersSelected || teamLeader === null || selectedProjectId === null) {
            // Show an error message or handle incomplete selection
            console.error("Please select all team members, team leader, and project");
            return;
        }

        // Use a Set to filter out duplicate users
        const uniqueSelectedMembers = [...new Set(localSelectedTeamMembers)];

        // Continue with the add action
        create({
            userId: uniqueSelectedMembers,
            leaderId: teamLeader,
            projectId: selectedProjectId,
            instructorId: instructorId
        });

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



    // Add these state variables at the beginning of your functional component
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedTeamIdForDelete, setSelectedTeamIdForDelete] = useState(null);

    const handleCloseTeamModal = () => {
        setAddModalOpen(false);
        setDeleteModalOpen(false);

        setDimmed(false);
    };

    const handleDeleteClick = (teamId) => {
        setDimmed(true);
        setSelectedTeamIdForDelete(teamId);
        setDeleteModalOpen(true);
    };

    const handleDeleteAction = (teamId) => {
        setDimmed(false);
        setSelectedTeamIdForDelete(teamId);
        setDeleteModalOpen(false);
    };


    

    const [currentTeam, setCurrentTeam] = useState(null);
   
    const contentClassName = isDimmed ? 'dimmed' : '';
    const [Teams, setTeams] = useState([]);

    const [teamMembers, setTeamMembers] = useState([]);
    const [insProjects, setInsProjects] = useState([]);
    // Add this at the beginning of your component
    const [createTeamCounter, setCreateTeamCounter] = useState(0);



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

            // Increment the counter
            setCreateTeamCounter(prevCounter => prevCounter + 1);

            // Add the new team to the state
            getAllTeams();
            getTeamMembers();
        } catch (error) {
            console.error("Error creating Team:", error);
        }
    };
    // Log the counter value to the console
    console.log("Create Team API calls:", createTeamCounter);



    const getAllTeams = async () => {
        try {
            const response = await axios.get("http://localhost:3000/team/getAllTeams", {
                params: {
                    instructorId: instructorId
                }
            });

            if (response && response.data && Array.isArray(response.data.response)) {
                console.log("response",response)
                console.log("response,data", response.data)
                console.log("response.data.response", response.data.response)

                // Assuming you have a function to convert IDs to names for all teams
                const mappedTeams = response.data.response.map(team => ({
                    ...team,
                    // Convert IDs to names if needed
                    teamId:team.teamId,
                    leaderName: team.leaderName, // Replace with actual conversion logic
                    projectTitle: team.projectTitle 
                     // Replace with actual conversion logic
                }));console.log("mapped",mappedTeams)
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
                    instructorId: instructorId,
                    projectTag:'Unassigned'
                }
            });
            console.log("ree", data.response);
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

    const getMembers = async (teamId) => {
        try {
            console.log("teamId",teamId)
            const { data } = await axios.get("http://localhost:3000/team/getTeamMembers", {
                params: {
                    teamId: teamId
                }
            });
            console.log("hey", data.response);
 
        } catch (error) {
            console.error("Error fetching Teams:", error);
            setLoading(false);
        }
    }; 
    const deleteTeam = async (teamId) => {
        try {
            console.log("teamid", teamId);
            const { data } = await axios.delete("http://localhost:3000/team/deleteTeam", {
                params:{
                teamId: teamId
                }
            });
            console.log("Response:", data);

            // Handle the deletion on the client side if needed
            setTeams(prevTeams => prevTeams.filter(team => team.teamId !== teamId));
        } catch (error) {
            console.error("Error deleting Team:", error);
            alert("Failed to delete team. Please try again.");
        }
    };

    const handleTeamLeaderSelect = (selectedOption) => {
        setTeamLeader(selectedOption ? selectedOption.value : null);
    };

   
        // Update the memberOptions for all dropdowns

   
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
        await getAllTeams();
        await getTeamMembers();
        await getInsProjects();
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        // Wrap fetchData in a setTimeout to ensure it runs after the initial rendering
        fetchData();  // Call getTeamMembers here
        // Call getTeamMembers here
    }, []);  // Include getTeamMembers in the dependency array
    // Include getAllTeams in the dependency array

    return (
        <div className="app">
            {loading ? <Loader /> : (
                <div className="data-container">
                    <div className={`h-screen w-screen flex justify-end ${showNotification ? 'blurr -z-50' : ''}`}>
                        {isLoadingView && (
                            <div className="modal-container flex items-center justify-center z-100">
                                <div className="loader-container">
                                    {/* Your loader component or message goes here */}
                                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
                                </div>
                            </div>
                        )}
                        {isViewModalOpen && (
                            
                            <div className="modal-container flex items-center justify-center z-100">
                                <div className="flex flex-col w-form gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="text-xl font-semibold text-center leading tracking">
                                        View Team
                                    </h2>
                                    <div className="mt-4">

                                        {/* Rest of your code for displaying team members */}
                                        {viewData && viewData.map((member, index) => (
                                            <div key={index}>
                                                <label htmlFor={`TeamMember${index + 1}`}>{`Team Member ${index + 1}`}</label><br />
                                                <input
                                                    type="text"
                                                    value={member.firstName + ' ' + member.lastName}
                                                    className="border w-full p-2 mb-2"
                                                    disabled
                                                /><br />
                                                {/* Add other fields as needed */}
                                            </div>
                                        ))}
                                        <div className="flex justify-end mt-6">
                                            <button className="px-6 py-2 rounded-sm shadow-sm bg-gray-200 text-black" onClick={handleViewAction}>
                                                Close
                                            </button>
                                            {/* Add other buttons or actions as needed */}
                                        </div>
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
                                                    options={memberOptions.filter(option => !localSelectedTeamMembers.includes(option.value))}
                                                    onChange={(selectedOption) => handleMemberSelect(selectedOption, index)}
                                                />




                                         </div>
                                        ))} <label htmlFor="teammember">Select team Leader</label><br />

                                        <Select
                                            className="bg-white rounded-lg mb-2 focus:outline-none text-black font-medium"
                                            isSearchable={true}
                                            isDisabled={false}
                                            placeholder="Select team leader"
                                            options={memberOptions.filter(option => localSelectedTeamMembers.includes(option.value))}
                                            onChange={(selectedOption) => handleTeamLeaderSelect(selectedOption)}
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
                                        <button
                                            className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 text-white ml-2"
                                            onClick={() => {
                                                console.log("Selected Team Members:", selectedTeamMembers.filter(member => member !== null));
                                                console.log("Team Leader ID:", teamLeader);
                                                console.log("Selected Project ID:", selectedProjectId);
                                                console.log("Instructor ID:", instructorId);
                                                handleAddAction();
                                            }}
                                        >
                                            Save
                                        </button>


                                    </div>
                                </div>
                            </div>
                        )}
                        {isDeleteModalOpen && (
                            <div className="modal-container flex items-center justify-center z-100">
                                {/* Add the necessary components for the delete modal */}
                                <div className="absolute bg-black opacity-50" onClick={handleCloseTeamModal}></div>
                                <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                                    <h2 className="flex items-center gap-2 text-xl font-semibold leadi tracki">
                                        <span className=''>Are you sure you want to delete this team?</span>
                                    </h2>
                                    {/* Add any additional information or confirmation message */}
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
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Teams</a>
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
                                                            <span className="px-3 py-2 text-white rounded-md bg-indigo-500 cursor-pointer" onClick={() => handleViewClick(team.teamId)}>
                                                                <span>View</span>
                                                            </span>
                                                            {console.log(team.teamId)}
                                                            <span className="px-3 py-2 ms-2 text-white rounded-md bg-red-500 cursor-pointer" onClick={() => handleDeleteClick(team.teamId)}>
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

export default Team;
