import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
// Components
import Navbar from "../components/Navbar.jsx";
import NotFound from "./NotFound.jsx";
// Icons
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

export default function TaskPage() {

    const params = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});
    const [error, setError] = useState({})
    const { getTask, updateTask, deleteTask } = useTasks();
    const confirmRef = useRef(null)

    const handleToggleDone = async (id, done) => {
        await updateTask(id, { 'done': !done })
        setTask({ ...task, done: !done })
    }

    useEffect(() => {
        const loadTask = async () => {
            const response = await getTask(params.id);
            if (response.id) {
                // Get timezone
                const create_date = new Date(response.create_date.replace('Z', ''));
                // Set the task in state
                setTask({
                    id: response.id,
                    title: response.title,
                    description: response.description,
                    done: response.done,
                    create_date: create_date.toLocaleString()
                })
            } else setError(response)
        }
        loadTask();
    }, [])

    const handleDeleteTask = async () => {
        await deleteTask(params.id)
        navigate('/');
    }

    const toggleDialog = () => {
        if (!confirmRef.current) {
            return;
        }
        confirmRef.current.hasAttribute('open')
        ? confirmRef.current.close()
        : confirmRef.current.showModal()
    }

    const handleClickDialog = (e) => {
        if (e.currentTarget === e.target) {
            toggleDialog();
        }
    }

    const renderTask = () => {
        return (
            <>
                <Navbar />
                <div className='mt-2 mb-16'>
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                        <a className={`${task.done ? 'text-secondary hover:text-cyan-400' : 'text-gray hover:text-light/50'} select-none cursor-pointer`}
                            title={task.done ? 'Set as pending' : 'Set as done'}
                            onClick={() => handleToggleDone(params.id, task.done)} >
                            <span className='text-2xl md:text-4xl'>
                                {task.done ? <FaCircleCheck /> : <FaRegCircle />}
                            </span>
                        </a>
                        <h2 className='text-light text-left font-medium md:font-semibold text-lg md:text-2xl'>{task.title}</h2>
                    </div>
                    <p className='text-light text-base md:text-lg whitespace-pre-line mb-8 md:mb-10'>{task.description}</p>
                    <div className='mb-10'>
                        <p className={`${task.done ? 'text-secondary' : 'text-warning'} flex items-center gap-2 mb-2`}>
                            <span className='mt-[0.08rem]'>
                                {task.done ? <FaRegCheckCircle /> : <FaRegClock />}
                            </span>
                            {task.done ? 'Done' : 'Pending'}
                        </p>
                        <p className='text-light text-sm md:text-base'>{
                            task.create_date
                        }</p>
                    </div>
                    <div className="flex flex-row-reverse justify-start gap-4">
                        <button
                            className="bg-secondary text-primary hover:bg-cyan-400 border-2 md:border-[3px] border-secondary hover:border-cyan-400 px-4 py-[2px] pb-1 md:px-6 md:py-2 rounded-xl md:rounded-2xl outline-none focus:border-[3px] focus:border-cyan-300"
                            onClick={() => navigate(`/edit/${params.id}`)}>
                            <span className="font-semibold text-base md:text-xl">
                                Edit
                            </span>
                        </button>
                        <button
                            className="bg-red-400 text-primary hover:bg-red-500 border-2 md:border-[3px] border-red-400 hover:border-red-500 px-4 pb-1 py-[2px] md:px-6 md:py-2 rounded-xl md:rounded-2xl outline-none focus:border-[3px] focus:border-red-300"
                            onClick={() => toggleDialog()}>
                            <p className="font-semibold text-base md:text-xl">
                                Delete
                            </p>
                        </button>
                    </div>
                </div>

                {/* Confirmation dialog */}  
                <dialog ref={confirmRef}
                className='bg-dark border-[3px] border-gray rounded-xl'
                onClick={(e) => handleClickDialog(e)}>
                    <div className='w-full h-full py-4 px-10'>
                        <div className="text-center text-light mb-4 text-base md:text-lg">
                            Are you sure you want to delete this task?
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <button
                            className='bg-gray text-light hover:bg-cyan-900 border-2 md:border-[3px] border-gray hover:border-cyan-900 px-4 py-[2px] pb-1 md:px-6 md:py-2 rounded-xl md:rounded-2xl font-semibold text-base md:text-xl outline-none focus:border-[3px] focus:border-cyan-800'
                            onClick={() => toggleDialog()}>
                                Cancel
                            </button>
                            <button
                            className="bg-secondary text-primary hover:bg-cyan-400 border-2 md:border-[3px] border-secondary hover:border-cyan-400 px-4 py-[2px] pb-1 md:px-6 md:py-2 rounded-xl md:rounded-2xl font-semibold text-base md:text-xl outline-none focus:border-[3px] focus:border-cyan-300"
                            onClick={() => handleDeleteTask()}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </dialog>
            </>
        )
    }

    return (
        task.id ? renderTask() : <NotFound apiError={error} />
    )
}
