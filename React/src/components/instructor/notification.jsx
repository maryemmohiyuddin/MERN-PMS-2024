import { FaTimes } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Notification({ notificationState, instructorId ,updateState,setActiveItem }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Run this effect once when the component mounts
    useEffect(() => {
        console.log("noti here", notificationState, instructorId, updateState)

        const getAllRequests = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/user/getAllRequests", {
                    params: {
                        instructorId: instructorId
                    }
                });
                console.log("data here", data.response);
                setRequests(data.response);
            } catch (error) {
                console.error("Error fetching requests:", error);
            } finally {
                // Set loading to false once data is fetched (whether successful or not)
                setTimeout(() => {
                    setLoading(false);
                },500);            }
        };
        getAllRequests();
    }, [instructorId]);
    return (
        <>
           
            <div className="bg-white notification h-screen w-1/5 z-100 absolute right-0 shadow-xl">
                <div className="flex justify-between  bg-indigo-500 items-center p-3 ps-5 text-white">
                    <h4 className="font-semibold">Notifications</h4>
                    <button className=' bg-indigo-500' onClick={() => notificationState.notificationState(false)}>
                        <FaTimes />
                    </button>
                </div>
                <hr />
                {loading ? <div className="flex items-center justify-center h-screen">
                    <div className="w-16 h-16  border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
                </div>
                    : (
                <div className=" fade-in h-full text-sm">
                    {requests.length === 0 ? (
                        <p>No new requests</p>
                    ) : (
                            <ul className=''>
                                {requests.map((request, index) => (
                                    <div key={request.requestId}>
                                        <li className='flex pb-5 ps-5 pe-5 hover-effect cursor-pointer'

                                            onClick={() => {
                                                notificationState.notificationState(false);
                                                updateState("REQUESTS");
                                                setActiveItem("REQUESTS");

                                            }}
                                            key={request.requestId}
                                        >
                                            <IoIosNotifications style={{ fontSize: '50px' }} />
                                            <span className='mt-3 ms-3'>
                                                You have a request for connection from{' '}
                                                <span className='font-semibold'>
                                                    {request.firstName + ' ' + request.lastName}{' '}
                                                </span>
                                                from cohort
                                                <span className='font-semibold'> {request.cohort} </span>
                                                and stack
                                                <span className='font-semibold'> {request.stack} </span>.
                                            </span>
                                        </li>

                                        {index < requests.length - 1 && <hr className="" />}
                                    </div>
                                ))}

                            
                        </ul>
                    )}
                </div>
                    )}

            </div>
        </>
    );
}

export default Notification;
