import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin mb-2 text-blue-500" />
            <p>Loading weather data...</p>
        </div>
    );
};

export default Loader;
