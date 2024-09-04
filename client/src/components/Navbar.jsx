import React from "react";
import { Link } from "react-router-dom";
// Icons
import { FaListCheck } from "react-icons/fa6";

function Navbar() {
    return (
        <>
            <nav className="py-16">
                <ul className="flex flex-wrap justify-between items-center gap-y-6">
                    <li>
                        <Link to={'/'} className="text-secondary text-4xl">
                            <div className="flex items-center">
                                <FaListCheck/>
                                <span className="font-semibold">QuickTasks</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/new'}
                        className='bg-gray text-light hover:bg-cyan-900 border-[3px] border-gray hover:border-cyan-900 px-6 py-2 rounded-2xl font-semibold text-xl outline-none focus:border-[3px] focus:border-cyan-800'>
                            <span className="font-semibold text-xl">
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
