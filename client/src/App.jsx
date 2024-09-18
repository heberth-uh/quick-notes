import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
// Pages
import TasksPage from "./pages/TasksPage.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TaskForm from "./pages/TaskForm.jsx";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TasksPage/>,
        errorElement: <NotFound/>,
    },
    {
        path: "/new",
        element: <TaskForm />,
    },
    {
        path: "/edit/:id",
        element: <TaskForm />,
    },
    {
        path: "/task/:id",
        element: <TaskPage />,
    },
]);

export default function App() {
    return (
        <>
            <div className="container mx-auto font-content px-4 md:px-8 md:w-4/6 lg:w-3/4 xl:w-2/5 2xl:2/5">
                <RouterProvider router={router}/>
            </div>
        </>
    )
}
