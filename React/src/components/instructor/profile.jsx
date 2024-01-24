import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../loader_component';
import Select from 'react-select';

function Profile({ updateState, showNotification,instructorId }) {
    // console.log("profile here updateState   ", updateState, "shownotification", showNotification, "instructorId", instructorId)

   
    const STACK = [
        {
            value: 'MERN',
            label: 'MERN',
        },
        {
            value: 'Python & Django',
            label: 'Python & Django',
        },
        {
            value: 'Data Science',
            label: 'Data Science',
        },
    ];

    const COHORT = [
        {
            value: 'Cohort-1',
            label: 'Cohort-1',
        },
        {
            value: 'Cohort-2',
            label: 'Cohort-2',
        },
        {
            value: 'Cohort-3',
            label: 'Cohort-3',
        },
        {
            value: 'Cohort-4',
            label: 'Cohort-4',
        },
    ];

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        cohort: '', // Initialize cohort as null if it's a Select component
        stack: '', // Initialize stack as null if it's a Select component
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const getUserById = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/user/getUserByUserId', {
                params: {
                    userId: instructorId,
                },
            });
            console.log(data.response);
            setData(data.response);
            setFormData({
                firstName: data.response.firstName,
                lastName: data.response.lastName,
                email: data.response.email,
                role: data.response.role,
                cohort: data.response.cohort,
                stack: data.response.stack,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error approving request:', error);
            alert('Failed to approve request. Please try again.');
        }
    };

    const handleChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsUpdating(true); // Set loading state to true during update
            await update(formData);
            getUserById(); // Optionally, you can fetch the updated data after the update API call
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsUpdating(false); // Set loading state back to false after update (success or failure)
        }
    };

    const update = async (body) => {
        try {
            const { data } = await axios.put('http://localhost:3000/user/updateProfile', {
                userId:instructorId,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                role: body.role,
                cohort: body.cohort ? body.cohort.value : null,
                stack: body.stack ? body.stack.value : null,
            });

            console.log('this is body', body);
            console.log("res",data);
            setData(data.response);
            setLoading(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    useEffect(() => {
        getUserById();
    }, []); // Include getUserById in the dependency array

    return (
        <div className="app">
            {loading ? <div className="flex ps-48 items-center justify-center h-screen">
                <div className="w-16 h-16  border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
            </div>
                : (
                <div className="data-container fade-in">
                    <div className={`className="h-screen w-screen flex justify-center items-center  ${showNotification ? ' blurrr' : ' '}`}>

                        <div className="h-screen w-screen flex justify-end ">
                            <div className=" px-3 ps-5 w-10/12 h-5/6">
                                <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                                    <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100">
                                        <li className="text-black flex items-center">
                                            <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                                        </li>
                                        <li className="flex items-center space-x-1">
                                            <span className="dark:text-gray-400">/</span>
                                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Profile</a>
                                        </li>

                                    </ol>
                                    <h3 className="font-bold text-2xl">Profile</h3>

                                </nav>
                                <div className="container p-2 mx-auto sm:p-4 text-black ">
                                    <section className="px-6 -ms-5 ">
                                        <form noValidate="" onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
                                            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900  bg-white">
                                                <div className="space-y-2 col-span-full lg:col-span-1">
                                                    <p className="font-medium">Personal Information</p>
                                                    <p className="text-xs">Here you can view and update your personal information.</p>
                                                </div>
                                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                                    <div className="col-span-full sm:col-span-3">
                                                        <label for="firstname" className="text-sm">First name</label>
                                                        <input
                                                            id="firstname"
                                                            defaultValue={data.firstName}
                                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                                            type="text"
                                                            placeholder="First name"
                                                            className="w-full rounded-md focus:outline-none bg-gray-100 p-2 dark:border-gray-700 dark:text-gray-900"
                                                        />

                                                    </div>
                                                    <div className="col-span-full sm:col-span-3">
                                                        <label for="lastname" className="text-sm">Last name</label>
                                                        <input id="lastname"
                                                            defaultValue={data.lastName}
                                                            onChange={(e) => handleChange('lastName', e.target.value)}

                                                            type="text" placeholder="Last name" className="w-full rounded-md focus:outline-none   bg-gray-100 p-2  dark:border-gray-700 dark:text-gray-900" />
                                                    </div>
                                                    <div className="col-span-full sm:col-span-3">
                                                        <label for="email" className="text-sm">Email</label>
                                                        <input id="email"
                                                            defaultValue={data.email}
                                                            disabled
                                                            type="email" placeholder="Email" className="w-full rounded-md focus:outline-none   bg-gray-100 p-2  dark:border-gray-700 dark:text-gray-900" />
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label for="address" className="text-sm">Role</label>
                                                        <input
                                                            defaultValue={data.role}
                                                            disabled
                                                            id="address" type="text" placeholder="" className="w-full rounded-md focus:outline-none   bg-gray-100 p-2  dark:border-gray-700 dark:text-gray-900" />
                                                    </div>
                                                    <div className="col-span-full sm:col-span-2">
                                                        <label for="cohort" className="text-sm">Cohort</label>
                                                        <Select
                                                            className="bg-gray-50 rounded-lg mb-2 focus:outline-none text-black text-sm"
                                                            defaultValue={{ value: data.cohort, label: data.cohort }}
                                                            isSearchable={true}
                                                            options={COHORT}
                                                            onChange={(selectedOption) => handleChange('cohort', selectedOption)}
                                                            isDisabled={false}
                                                            placeholder="Select Cohort"
                                                        />

                                                    </div>
                                                    <div className="col-span-full sm:col-span-2">
                                                        <label for="stack" className="text-sm">Stack</label>
                                                        <Select
                                                            className="bg-gray-50  rounded-lg mb-2 focus:outline-none text-black text-sm"
                                                            defaultValue={{ value: data.stack, label: data.stack }} // Assuming data.stack is the stack value
                                                            onChange={(selectedOption) => handleChange('stack', selectedOption)}

                                                            isSearchable={true}
                                                            options={STACK}

                                                            isDisabled={false}
                                                            placeholder="Select Stack"
                                                        />      </div>

                                                    <br /><br />
                                                    <div className='flex mt-20 justify-end items-end w-full'>
                                                        <button
                                                            type="submit"
                                                            className={`w-full rounded-md bg-indigo-500 text-white shadow-sm ${isUpdating ? 'cursor-not-allowed opacity-50' : ''
                                                                }`}
                                                            disabled={isUpdating}
                                                        >
                                                            {isUpdating ? 'Updating...' : 'Update'}
                                                        </button>                                                    </div>
                                                </div>

                                            </fieldset>
                                        </form>
                                    </section>

                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                </div>
            )}
        </div>
    );
}

export default Profile;