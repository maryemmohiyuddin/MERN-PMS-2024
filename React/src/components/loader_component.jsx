import React from 'react';

function Loader() {
    return (
        <div className="flex ms-28 items-center justify-center space-x-2 loader-container">
            <div className="w-4 h-4 rounded-full animate-pulse loader-dot"></div>
            <div className="w-4 h-4 rounded-full animate-pulse loader-dot"></div>
            <div className="w-4 h-4 rounded-full animate-pulse loader-dot"></div>
        </div>
    );
}

export default Loader;
