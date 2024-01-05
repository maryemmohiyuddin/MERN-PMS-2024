
function ProjectDetails() {
    // Dummy data for team members with status and project files
    const teamMembers = [
        { id: 1, name: 'Hira', task: 'Login page', status: 'Pending', projectFile: null },
        { id: 2, name: 'Hira Khalil', task: 'Signup page', status: 'Approved', projectFile: 'File2.docx' },
        { id: 3, name: 'Hira', task: 'Navbar', status: 'In Revision', projectFile: 'File3.txt' },
        { id: 4, name: 'Hira Khalil', task: 'Task', status: 'Pending', projectFile: null },
        { id: 5, name: 'Hira', task: 'Onboarding', status: 'Approved', projectFile: 'File5.pptx' },
        { id: 6, name: 'Hira Khalil', task: 'Dashboard', status: 'In Revision', projectFile: 'File6.docx' },
        // Add more team members as needed
    ];

    // Function to get the color class based on status
    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'text-red-500';
            case 'Approved':
            case 'In Revision':
                return 'text-indigo-500';
            // Add more cases as needed
            default:
                return ''; // No specific color class for other statuses
        }
    };

    return (
        <>
            <div className="h-screen w-screen px-7 flex justify-end">
                <div className="ps-16 w-10/12 h-5/6">

                    <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                        <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100">
                            <li className="text-black flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">
                                    Trainee
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">
                                    Project Details
                                </a>
                            </li>
                        </ol>
                        <h3 className="font-bold text-3xl text-black">Project Details</h3>
                    </nav>

                    {/* Table for Team Members */}
                    <div className="mt-4 px-7">
                        <h4 className="text-xl font-semibold mb-2">Team Members</h4>
                        <table className="min-w-full border border-collapse rounded overflow-hidden text-left bg-white dark:bg-white text-sm">
                            <thead className="bg-white dark:bg-white">
                                <tr>
                                    <th colSpan="5" className="border p-2 text-center bg-white dark:bg-white">
                                        Project Name: PMS
                                    </th>
                                </tr>
                                <tr className='bg-indigo-500 text-white'>
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Task</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Project File</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((member) => (
                                    <tr key={member.id} className="bg-white">
                                        <td className="border p-2">{member.id}</td>
                                        <td className="border p-2">{member.name}</td>
                                        <td className="border p-2">{member.task}</td>
                                        <td className={`border p-2  ${getStatusColorClass(member.status)}`}>{member.status}</td>
                                        <td className={`border p-2 ${!member.projectFile && 'no-underline'}`}>
                                            {member.status !== 'Pending' && member.projectFile ? (
                                                <a href={`/path/to/your/files/${member.projectFile}`} className='underline' download>
                                                    {member.projectFile}
                                                </a>
                                            ) : (
                                                'No file available'
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetails;
