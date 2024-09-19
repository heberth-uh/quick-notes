import React from "react";
import { Link } from "react-router-dom";
// Icons
import { FaListCheck } from "react-icons/fa6";

function Navbar() {
    return (
        <>
            <nav className="py-5 md:py-10 lg:py-16">
                <ul className="flex flex-wrap justify-between items-center gap-y-6">
                    <li>
                        <Link to={'/'} className="text-secondary text-lg md:text-2xl lg:text-3xl">
                            <div className="flex items-center">
                                <FaListCheck/>
                                <span className="font-semibold">QuickTasks</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/new'}
                        className='bg-gray text-light hover:bg-cyan-900 border-2 md:border-[3px] border-gray hover:border-cyan-900 px-4 py-[2px] pb-1 md:px-6 md:py-2 rounded-xl md:rounded-2xl font-semibold outline-none focus:border-[3px] focus:border-cyan-800'>
                            <span className="font-semibold md:text-xl">
                                New Task
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
