import React from "react";
import { useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";


function NotFound({apiError}) {
    const error = useRouteError() || apiError;
    return (
        <div id="error-page">
            <Navbar/>
            <h4 className="text-light text-left font-semibold text-xl md:text-2xl mb-2">Oops! Something went wrong.</h4>
            <p className="text-base lg:text-lg italic text-light font-thin">
                <i>
                    {error.data?.message || error.statusText || error.message}
                </i>
            </p>                    
        </div>
    );
}

export default NotFound;
