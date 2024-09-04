import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { CgClose } from "react-icons/cg";
// Icons
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";

export default function TaskCard({ task }) {

    const navigate = useNavigate();
    const { deleteTask, updateTask, tasks, setTasks } = useTasks();

    const handleDeleteTask = async (event, id) => {
        event.stopPropagation();
        await deleteTask(id)
    }

    const handleToggleDone = async (event, id, done) => {
        event.stopPropagation();
        await updateTask(id, { 'done': !done })
        setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !done } : task)))
    }

    // Returns a string with the amount of words given 
    const getShortTest = (text, length) => {
        const words = text.split(' ')
        if (!length || length >= words.length ) {
            return text;
        }
        return words.slice(0, length).join(' ') + '...';
    }

    const handleKeypress = (event) => {
        if (event.key == 'Enter') {
            event.target.click();
        }
    }

    return (
        <div key={task.id} tabIndex={0}
        onClick={() => navigate(`/task/${task.id}`) }
        onKeyDown={(event) => handleKeypress(event)}
        className='relative mb-4 border-[3px] border-gray hover:bg-dark/50 rounded-3xl py-4 px-6 text-left cursor-pointer focus:border-secondary outline-none block'>
            <div className="flex items-center gap-6">
                <a className={`${task.done ? 'text-secondary hover:text-cyan-400' : 'text-gray hover:text-light/50'} text-4xl select-none cursor-pointer`}
                title={task.done ? 'Set as pending' : 'Set as done'}
                onClick={(event) => handleToggleDone(event, task.id, task.done)} >
                    <span>{task.done ? <FaCircleCheck/> : <FaRegCircle/>}</span>
                </a>
                <div className='overflow-hidden'>
                    <h3 className='text-base font-semibold text-light mb-1 mr-4 overflow-hidden text-nowrap text-ellipsis'>
                        <span className={`${task.done ? 'line-through' : ''}`}>
                            {task.title}
                        </span>
                    </h3>
                    <p className={`${task.done ? 'line-through' : ''} text-sm lg:text-base text-light mb-1 overflow-hidden text-ellipsis whitespace-nowrap`}>
                        <span>
                            {getShortTest(task.description, 16)}                        
                        </span>
                    </p>
                </div>
                <button className='absolute top-3 right-3 text-gray hover:text-light/50 hover:text-gray-300 text-3xl'
                onClick={(event) => handleDeleteTask(event, task.id)}
                tabIndex={-1}>
                    <CgClose/>
                </button>
            </div>
        </div>
    )
}
