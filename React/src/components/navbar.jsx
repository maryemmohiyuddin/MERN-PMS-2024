import React, { useState } from 'react'
import Button from './button';
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import '../customSideBar.css'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


function Nav({ updateState, setHasNewNotification, notificationState,instructorId,showNotification,hasNewNotifications} ) {
    console.log("nav bar here","updateState   ", updateState, "updatenew",setHasNewNotification,"notificationState", notificationState, "instructorId", instructorId,"showNotification",showNotification,"hasNewNotifications",hasNewNotifications)

    const [dataToSend, setDataToSend] = useState('');

 
   const  navigate=useNavigate()
    

    // const handleOverlayClick = () => {
    //     console.log("Overlay clicked");
    //     setShowNotifications(false);
    // };
    const handleLogout = async () => {
        try {
            // Call the backend logout API
            await axios.post('http://localhost:3000/auth/logout',{


            userId:instructorId
            } /* Add any necessary data for the logout */);

            // Delete cookies on the frontend
            document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
navigate("/")
            // useNavigate("/trainee")
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle errors if needed
        }
    };

    const [showDropdown, setShowDropdown] = useState(false);

    let [open, setOpen] = useState(false);
    
    return (
        
        <div className={`bg-white  shadow-md rounded-full flex fixed top-12 right-14  ${showNotification ? 'blurrr' : ' '}`}>
            {showDropdown && (
                <div className="absolute  top-12 right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                    <ul>
                        <li className="hover:bg-gray-100 py-2 px-4 cursor-pointer">Privacy Policy</li>

                        <li className="hover:bg-gray-100 py-2 px-4 cursor-pointer">Settings</li>

                        <li onClick={handleLogout} className="p-3 cursor-pointer text-red-500">
                            Logout
                        </li>                        {/* Add more dropdown options here as needed */}
                    </ul>
                </div>
            )}

            <div className='md:flex py-0 px-5 w-12/12'>
                <div className='cursor-pointer flex items-center 
      text-gray-800'>

                </div>

                <div onClick={() => setOpen(!open)} className='bg-black text-xl absolute right-8 top-6 cursor-pointer md:hidden'>
                    <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                    <li><fieldset className="w-3 space-y-1 dark:text-gray-100">
                        <label for="Search" className="hidden  bg-gray-100">Search</label>
                        <div className="relative rounded-full">
                            <span className="absolute inset-y-0 flex items-center pl-2  bg-gray-100 rounded-full">
                                <button type="button" title="search" className="p-1 focus:outline-none focus:ring" fdprocessedid="i6p2q">
                                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                    </svg>
                                </button>
                            </span>
                            <input type="search" name="Search" placeholder="Search..." className=" bg-gray-100 w-32 py-2 pl-10 text-sm rounded-full sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400" />
                        </div>
                    </fieldset></li>
                    <li className='p-3 cursor-pointer' onClick={() => {
                        updateState("PROFILE");
                    }}>
                        <CgProfile  /></li>
                    <li className='p-3 cursor-pointer' onClick={() => {
                        notificationState.notificationState(true);
                        setHasNewNotification(false);

                    }}>
                        <IoIosNotifications />
                        {hasNewNotifications && <div className="notification-indicator"></div>}

                    </li>
                    <li className='p-3 cursor-pointer'><FiMessageSquare />
                    </li>

                    <li onClick={() => setShowDropdown(!showDropdown)} className='p-3  cursor-pointer'>                        <img
                        src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-8 h-8 rounded-full" />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav