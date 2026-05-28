import React from 'react'

import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import HomePage from "./pages/HomePage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import JobPage, { jobLoader } from "./pages/JobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";


const App = () => {

    const addJob = async (newJob) => {

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                    },
                body: JSON.stringify(newJob),
                });

            if (!res.ok) {
                throw new Error(`Failed to add job: ${res.status} ${res.statusText}`);
            }

            return await res.json();
        } catch (error) {
            console.error('Error adding job:', error);
            throw error; // Re-throw so AddJobPage can handle it
        }

    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />} >
                <Route index element={<HomePage />} />
                <Route path='/jobs' element={<JobsPage />} />
                <Route path='jobs/:id' element={<JobPage />} loader={jobLoader} />
                <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    )
}
export default App
