import { useEffect } from "react";
// Components
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { useTasks } from "../context/TaskContext.jsx";

export default function TaskPages() {

    const { tasks, loadTasks } = useTasks();

    useEffect(() => {
        loadTasks();
    }, [])

    const renderContent = () => {
        if (tasks.length === 0) {
            return <p className="py-4 italic text-light font-thin">
                No tasks found
            </p>
        }
        return tasks.map(task => (<TaskCard key={task.id} task={task} />))
    }

    return (
        <>
            <Navbar />
            <section className="text-center mt-2 mb-16">
                <h1 className="text-light text-left font-medium md:font-semibold text-lg md:text-2xl mb-4">My tasks</h1>
                <div>{renderContent()}</div>
            </section>
        </>
    )
}