import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader_component";
import Cookies from "js-cookie";

function Request({ updateState,showNotification, instructorId }) {

    const [Requests, setRequests] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Run this effect once when the component mounts
    useEffect(() => {
        

            console.log("instructorid",instructorId); // This will log the userId value

        const getAllRequests = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/user/getAllRequests",{
                    params:{
                        instructorId: instructorId
                    }
                });
                setData(data);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
                console.log(data)
                if (data.response) {
                    const formattedRequests = data.response.map(item => ({
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                        userId: item.userId
                    }));
                    setRequests(formattedRequests);
                }

            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false);

            }
        };
        getAllRequests(1);

    }, []);

    const approveRequest = async (userId) => {
        try {
            await axios.put("http://localhost:3000/user/updateUser", {

                userId,
                
                isApproved: true,


            });
            // If successful, remove the approved request from the frontend
            setRequests(prevRequests => prevRequests.filter(request => request.userId !== userId));
            alert("The request has been approved successfully");
        } catch (error) {
            console.error("Error approving request:", error);
            alert("Failed to approve request. Please try again.");
        }
    };



    return (
        <>
            <div className="app">
                {loading ? <div className="flex ps-48 items-center justify-center h-screen">
                    <div className="w-16 h-16  border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
                </div>
                    : (<div className="data-container">
                            <div className={`className="h-screen fade-in w-screen flex  justify-end ${showNotification ? 'blurr -z-50' : ''}`}>

                            <div className=" px-3 ps-8 w-10/12 h-5/6">
                                <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                                    <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100">
                                        <li className="text-black flex items-center">
                                            <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                                        </li>
                                        <li className="flex items-center space-x-1">
                                            <span className="dark:text-gray-400">/</span>
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Requests</a>
                                        </li>

                                    </ol>
                                    <h3 className="font-bold text-2xl">Requests</h3>

                                </nav>
                                <div className="container p-2 mx-auto sm:p-4 text-black ">
                                    <h4 className="font-semibold text-md mb-2  ">All Trainees</h4>
                                    <div className="overflow-x-auto shadow-md me-5 bg-white ">
                                        <table className="w-full  text-sm border-collapse">           
                                        <thead className="bg-white">
                                            <tr className="bg-indigo-500 text-sm text-white">
                                                <th className="border border-gray-300 px-4 py-2">First Name</th>
                                                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                                <th className="border border-gray-300 px-4 py-2">Action</th>



                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Requests.map((request, index) => (

                                                <tr key={index} >
                                                    <td className="border border-gray-300 text-sm bg-white px-4 py-2">{request.firstName}</td>
                                                    <td className="border border-gray-300 text-sm  bg-white px-4 py-2">{request.lastName}</td>
                                                    <td className="border border-gray-300 text-sm  bg-white px-4 py-2">{request.email}</td>
                                                    <td className="border border-gray-300 text-sm  bg-white px-4 py-2"><button onClick={() => void approveRequest(request.userId)} className="bg-indigo-500 me-2 py-1 px-2 text-white hover:bg-indigo-600 hover:shadow-md hover-effect">Approve</button><button className="bg-red-500 hover:bg-red-600 hover:shadow-md hover-effect py-1 px-2 text-white">Reject</button></td>


                                                </tr>
                                            ))}
                                        </tbody>
                                        {Requests.length === 0 && (
                                            <p className="text-left mt-4 ms-3 text-sm  text-red-500">No request data yet.</p>
                                        )}
                                    </table>
                                </div>

                            </div>
                        </div>
                        </div>
                        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                    </div>
                )}
            </div>
        </>
    );
}

export default Request;
