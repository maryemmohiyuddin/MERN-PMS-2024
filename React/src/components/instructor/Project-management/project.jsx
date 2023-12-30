
function Project() {
    return (
        <>

            <div className="h-screen w-screen flex justify-end ">
                <div className=" ps-12 w-10/12 h-5/6">
                    <nav aria-label="breadcrumb" className="text-black w-full p-4 dark:bg-gray-800 dark:text-gray-100">
                        <ol className="text-black mt-6 flex h-8 space-x-2 dark:text-gray-100">
                            <li className="text-black flex items-center">
                                <a rel="noopener noreferrer" href="#" title="Back to homepage" className="text-black text-sm hover:text-black flex items-center hover:underline">Instructor</a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <span className="dark:text-gray-400">/</span>
                                <a rel="noopener noreferrer" href="#" className="text-black text-sm hover:text-black flex items-center px-1 capitalize hover:underline">Projects</a>
                            </li>

                        </ol>
                        <h3 className="font-bold text-3xl">Projects</h3>

                    </nav>
                </div>
            </div>
        </>
    );
}

export default Project;
