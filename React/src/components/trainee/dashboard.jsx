import { MdOutlinePendingActions } from "react-icons/md";
import { GrHelpBook } from "react-icons/gr";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { BsMicrosoftTeams } from "react-icons/bs";

function Dashboard() {
    return (
        <>

            <div className="  px-7 h-screen  w-screen flex justify-end ">
                <div className=" ps-12 w-10/12 h-5/6">
                    <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                        <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100 px-5">
                            <li className="text-black flex items-center ">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Trainee</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Dashboard</a>
                            </li>
                        </ol>
                        <h3 className=" px-5 font-bold text-3xl">Dashboard</h3>

                    </nav>
                    <section className="px-5 md:p-8 dark:bg-gray-800 dark:text-gray-100">
                        <div className="container grid grid-cols-1 gap-6 m-4 mx-auto md:m-0 md:grid-cols-2 xl:grid-cols-3">
                            <div className="bg-white shadow-md rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                                        <path d="M487.938,162.108l-224-128a16,16,0,0,0-15.876,0l-224,128a16,16,0,0,0,.382,28l224,120a16,16,0,0,0,15.112,0l224-120a16,16,0,0,0,.382-28ZM256,277.849,65.039,175.548,256,66.428l190.961,109.12Z"></path>
                                        <path d="M263.711,394.02,480,275.061V238.539L256,361.74,32,238.539v36.522L248.289,394.02a16.005,16.005,0,0,0,15.422,0Z"></path>
                                        <path d="M32,362.667,248.471,478.118a16,16,0,0,0,15.058,0L480,362.667V326.4L256,445.867,32,326.4Z"></path>
                                    </svg>
                                </div>
                                <div className="flex items-center shadow-md  justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">10+</p>
                                    <p>Assigned Tasks</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <MdOutlinePendingActions style={{ fontSize: '20px' }} />

                                </div>
                                <div className="flex items-center shadow-md justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">15+</p>
                                    <p>Pending Tasks</p>
                                </div>
                            </div>
                            <div className="bg-white  rounded-full shadow-md flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <BsMicrosoftTeams style={{ fontSize: '20px' }} />
                                </div>
                                <div className="flex items-center shadow-md justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">14</p>
                                    <p>Team Members</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                                        <path d="M256.25,16A240,240,0,0,0,88,84.977V16H56V144H184V112H106.287A208,208,0,0,1,256.25,48C370.8,48,464,141.2,464,255.75S370.8,463.5,256.25,463.5,48.5,370.3,48.5,255.75h-32A239.75,239.75,0,0,0,425.779,425.279,239.75,239.75,0,0,0,256.25,16Z"></path>
                                        <polygon points="240 111.951 239.465 288 368 288 368 256 271.563 256 272 112.049 240 111.951"></polygon>
                                    </svg>
                                </div>
                                <div className="flex shadow-md  items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">24/7 h</p>
                                    <p>Task Deadlines</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <LiaProjectDiagramSolid style={{ fontSize: '20px' }} />

                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">99.9%</p>
                                    <p>Project</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md  rounded-full flex overflow-hidden dark:bg-gray-900 dark:text-gray-100">
                                <div className="flex flex-col items-center justify-center ml-3 mt-3 h-8 w-8 rounded-full bg-indigo-500 text-white dark:text-gray-800">
                                    <GrHelpBook style={{ fontSize: '20px' }} />
                                </div>
                                <div className="flex items-center justify-between flex-1 p-3">
                                    <p className="text-2xl font-semibold">12</p>
                                    <p>Helping Material</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
