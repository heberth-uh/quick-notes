import axios from 'axios'

const domain = import.meta.env.VITE_BACKEND_URL || `http://localhost:4000`

export const getTasksRequest = async () =>
    await axios.get(`${domain}/tasks`)

export const createTaskRequest = async (task) =>
    await axios.post(`${domain}/tasks`, task);

export const deleteTaskRequest = async (id) =>
    await axios.delete(`${domain}/task/${id}`);

export const getTaskRequest = async id =>
    await axios.get(`${domain}/task/${id}`)

export const updateTaskResquest = async (id, values) =>
    await axios.put(`${domain}/task/${id}`, values)
