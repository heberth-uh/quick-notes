import { createContext, useContext, useState } from "react";
import { getTasksRequest, getTaskRequest, createTaskRequest, updateTaskResquest, deleteTaskRequest } from '../api/task.api'

// Exports the global task context to access from any component (inside TaskContextProvider)
// this is not gonna be used to read context in components due we are going to use the 'useTasks' hook instead
export const TaskContest = createContext()

// Hook to access quickly to TaskContext from any component
export const useTasks = () => {
    const context = useContext(TaskContest)
    if (!context) {
        return new Error('useTasks must be within a TaskContextProvider');
    }
    return context;
}

// Component who accesses to the whole context, the prop can be any child component
export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);

    // Get and load tasks
    async function loadTasks() {
        const response = await getTasksRequest();
        setTasks(response.data);
    }

    // Create new task
    const createTask = async values => {
        try {
            const response = await createTaskRequest(values);
            setTasks([...tasks, response.data]) // Update the tasks state adding the new task.
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    // Get task
    const getTask = async id => {
        try {
            const task = await getTaskRequest(id)
            return task.data
        } catch (error) {
            return error.response
        }
    }

    // Update task
    const updateTask = async (id, values) => {
        try {
            await updateTaskResquest(id, values);
            loadTasks();
        } catch (error) {
            console.log('Error editing task: ', error.response.data.message)
        }
    }

    // Delete task
    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id);
            // this filters the state with the different ids than the deleted one  (id parameter)
            setTasks(tasks.filter(task => task.id !== id))
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContest.Provider value={{
            tasks, setTasks,
            loadTasks,
            getTask,
            createTask,
            updateTask,
            deleteTask,
        }}>
            {children}
        </TaskContest.Provider>
    )
}