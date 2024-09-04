import axios from 'axios'
import { PORT } from '../../../server/config';

const domain = `http://localhost:${PORT}`;

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
