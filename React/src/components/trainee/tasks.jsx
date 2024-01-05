import React, { useState } from 'react';

function Task() {
    // State variables to manage task name, task description file, uploaded file, and success messages for each row
    const [tasks, setTasks] = useState([
        { id: 1, taskName: 'Login page', taskDescriptionFile: 'existing-file.pdf', file: null, successMessage: '', deadline: '2023-12-31' },
        { id: 2, taskName: 'Onboarding', taskDescriptionFile: 'existing-file.pdf', file: null, successMessage: '', deadline: '2023-12-25' },
        { id: 3, taskName: 'Trainee Dashboard', taskDescriptionFile: 'existing-file.pdf', file: null, successMessage: '', deadline: '2023-12-20' },
    ]);

    // Function to handle changes in the task name field
    const handleNameChange = (event, taskId) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskId - 1].taskName = event.target.value;
        setTasks(updatedTasks);
    };

    // Function to handle file upload for task
    const handleFileUpload = (event, taskId) => {
        const selectedFile = event.target.files[0];
        const updatedTasks = [...tasks];
        updatedTasks[taskId - 1].file = selectedFile;
        setTasks(updatedTasks);
    };

    // Function to handle form submission for each row
    const handleSubmit = (event, taskId) => {
        event.preventDefault();

        const updatedTasks = [...tasks];
        const originalTaskName = updatedTasks[taskId - 1].taskName; // Store the initial task name

        if (updatedTasks[taskId - 1].file) {
            updatedTasks[taskId - 1].successMessage = <p className="text-green-500 mt-2">File submitted successfully!</p>;
        } else {
            updatedTasks[taskId - 1].successMessage = <p className="text-red-500 mt-2">Please choose a file!</p>;
        }

        // Reset the form, keeping the original task name
        updatedTasks[taskId - 1].taskName = originalTaskName;
        updatedTasks[taskId - 1].file = null;

        setTasks(updatedTasks);
    };

    return (
        <div className="h-screen w-screen  justify-center items-center flex">
            <div className="ml-20 ps-20 w-10/12 h-5/6">

                <nav aria-label="breadcrumb" className="text-black w-full  dark:bg-gray-800 dark:text-gray-100">
                    <ol className="text-black mt-7 px-5 ml-14 flex h-8 space-x-2 dark:text-gray-100">
                        <li className="text-black flex items-center">
                            <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">
                                Trainee
                            </a>
                        </li>
                        <li className="flex items-center  space-x-1">
                            <span className="dark:text-gray-400">/</span>
                            <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">
                                Task Details
                            </a>
                        </li>
                    </ol>
                    <h3 className="font-bold text-3xl ml-12 px-7 text-black">Task Details</h3>
                </nav>

                <div className="w-full ml-20  mt-12">
                    <form className="w-full text-align-left">
                        <table className="  border border-collapse rounded overflow-hidden text-left bg-white dark:bg-white text-sm">
                            <thead>
                                <tr>
                                    <th colSpan="7" className="border p-2 text-center bg-white dark:bg-white">
                                        Project Name: PMS
                                    </th>
                                </tr>
                                <tr className="bg-indigo-500   text-sm text-white">
                                    <th className="border p-2">Task ID</th>
                                    <th className="border p-2">Task Name</th>
                                    <th className="border p-2">Task Description File</th>
                                    <th className="border p-2">Deadline Date</th>
                                    {/* <th className="border p-2">Solution File</th> */}
                                    <th className="border p-2">Upload Solution</th>
                                    <th className="border p-2">Upload Task</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td className="border p-2">
                                            {task.id}
                                        </td>
                                        <td className="border p-2">
                                            {task.taskName}
                                        </td>
                                        <td className="border p-2">
                                            <p className="text-blue-500 mt-2">
                                                <a href={`/path/to/task-description-files/${task.taskDescriptionFile}`} download>
                                                    Download File
                                                </a>
                                            </p>
                                        </td>
                                        <td className="border p-2">
                                            {task.deadline}
                                        </td>

                                        <td className="border p-2">
                                            <input
                                                type="file"
                                                accept=".pdf, .zip, .docx"
                                                onChange={(event) => handleFileUpload(event, task.id)}
                                                className="mt-1 w-full border rounded-sm"
                                            />
                                        </td>
                                        <td className="border p-2">
                                            <button
                                                type="submit"
                                                onClick={(event) => handleSubmit(event, task.id)}
                                                className="bg-indigo-500 text-white px-2 py-1 rounded-md"
                                            >
                                                Submit Task
                                            </button>
                                            {task.successMessage}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Task;
