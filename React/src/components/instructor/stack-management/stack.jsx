import { useState } from "react";
function Stack() {

        const [isModalOpen, setModalOpen] = useState(false);
        const [isDimmed, setDimmed] = useState(false);

        const handleBlockClick = () => {
            setModalOpen(true);
            setDimmed(true); // Dim the content
        };

        const handleCloseModal = () => {
            setModalOpen(false);
            setDimmed(false); // Remove the dim effect
        };

        const contentClassName = isDimmed ? 'dimmed' : '';
    return (
        <>
            <div className='className="h-screen w-screen flex justify-center items-center my-8"'>

                {isModalOpen && (
                    <div className="modal-container flex items-center justify-center z-100 ">
                        <div className="absolute  bg-black opacity-50" onClick={handleCloseModal}></div>
                        <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white opacity-100 text-black">
                            <h2 className="flex items-center gap-2 text-xl font-semibold leadi tracki ">
                              <span className='mb-4'>Add a new class</span>
                            </h2>
                            <p className="flex-1 dark:text-gray-400"><fieldset className="w-full space-y-1 dark:text-gray-100">
                                <label for="url" className="block text-md font-medium">Stack name:</label>
                                <div className="flex">
                                    <select  class="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-36 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" name="role" id="role">
                                        <option value="Choose a stack" selected disabled>Choose a stack</option>

                                        <option value="MERN">MERN</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Python & DJANGO">Python & DJANGO</option>


                                    </select>                                   </div>
                            </fieldset>
                                <fieldset className="w-full mt-5 space-y-1 dark:text-gray-100">
                                    <label for="url" className="block text-md font-medium">Cohort:</label>
                                    <div className="flex">
                                        <select class="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-36 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" name="role" id="role">
                                            <option value="Choose a stack" selected disabled>Choose Cohort</option>

                                            <option value="Cohort-1">Cohort-1</option>
                                            <option value="cohort-2">Cohort-2</option>
                                            <option value="cohort-3">Cohort-3</option>
                                            <option value="cohort-4">Cohort-4</option>



                                        </select>                                   </div>
                                </fieldset>
                                <fieldset className="w-full mt-5 space-y-1 dark:text-gray-100">
                                    <label for="url" className="block text-md font-medium">Timmings:</label>
                                    <div className="flex">
                                        <select class="w-full rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-36 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" name="role" id="role">
                                            <option value="Choose a stack" selected disabled>Choose timmings</option>

                                            <option value="Morning">Morning</option>
                                            <option value="Evening">Evening</option>


                                        </select>                                   </div>
                                </fieldset>
                            </p>
                            <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                <button className="px-6 py-2 rounded-sm shadow-sm  bg-indigo-500  text-white" onClick={handleCloseModal} >Add</button>
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
                                <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Stacks</a>
                            </li>

                        </ol>
                        <h3 className="font-bold text-3xl">Stacks</h3>

                    </nav>
                    <div className="flex items-end">
                        <div className="me-7 w-4/12 ms-3 mb-0">
                            <h2 className="font-semibold ps-3 mt-10">Total Stacks</h2>                        <div className=" mt-2   dark:text-gray-100 dark:bg-gray-900">

                            </div>
                        </div>
                        <div className="w-7/12 ms-3 flex justify-end"> {/* Added justify-end here */}
                            <button onClick={handleBlockClick}
 type="button" className="px-5 me-2 py-2 h-10 mt-10 font-semibold rounded-full bg-indigo-500 text-white dark:bg-gray-100 dark:text-gray-800">
                                + Add class
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto me-14 ms-5 mt-3">
                        <table className="w-full text-xs bg-white rounded-xl ">
                            <thead className="rounded-t-lg dark:bg-gray-700">
                                <tr className="text-right border border-gray-100">
                                    <th title="Stack Name" className="border border-gray-100 text-sm  text-left p-3 text-md">Stack Name</th>
                                    <th title="Class Name" className=" border border-gray-100 text-sm  text-left p-3">Class Name</th>
                                    <th title="Number of Trainees" className="p-3 border border-gray-100 text-sm  text-left">Number of trainees</th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-right text-sm  border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>MERN</span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                        <span>Cohort-4<span className=" text-gray-400 block ">(evening)</span> </span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>4</span>
                                    </td>

                                </tr>
                                <tr className="text-right text-sm  border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>MERN</span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                        <span>Cohort-4<span className=" text-gray-400 block ">(evening)</span> </span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>4</span>
                                    </td>

                                </tr>
                                <tr className="text-sm  border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>MERN</span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                        <span>Cohort-4<span className=" text-gray-400 block ">(evening)</span> </span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>4</span>
                                    </td>

                                </tr>
                                <tr className="text-right text-sm   border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">


                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>MERN</span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left ">
                                        <span>Cohort-4<span className=" text-gray-400 block ">(evening)</span> </span>
                                    </td>
                                    <td className="px-3 py-2 border border-gray-100  text-left">
                                        <span>4</span>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            </div>
        </>
    );
}

export default Stack;
