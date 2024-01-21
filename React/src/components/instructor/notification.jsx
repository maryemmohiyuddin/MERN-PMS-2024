import { FaTimes } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Notification({ notificationState, instructorId ,updateState,setActiveItem }) {
    const [requests, setRequests] = useState([]);

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
            }
        };
        getAllRequests();
    }, [instructorId]);

    return (
        <>
            <div className="bg-white notification h-screen w-1/5 z-100 absolute right-0">
                <div className="flex justify-between items-center m-5">
                    <h4 className="font-semibold text-xl">Notifications</h4>
                    <button className='bg-white' onClick={() => notificationState.notificationState(false)}>
                        <FaTimes />
                    </button>
                </div>
                <hr />
                <div className="  h-full">
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
            </div>
        </>
    );
}

export default Notification;
