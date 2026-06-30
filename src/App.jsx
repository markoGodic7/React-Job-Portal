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
import EditJobPage from "./pages/EditJobPage.jsx";


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

    const deleteJob = async (id) => {
        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error(`Failed to delete job: ${res.status} ${res.statusText}`);
            }
            return await res.json();
        } catch (error) {
            console.error('Error deleting job:', error);
            throw error;
        }
    }

    const updateJob = async (job) => {
        try {
            const res = await fetch(`/api/jobs/${job.id}`, {
                method: "PUT",
                headers: {
                'Content-Type': 'application/json',
                    },
                body: JSON.stringify(job),
                });
            if (!res.ok) {
                throw new Error(`Failed to update job: ${res.status} ${res.statusText}`);
            }
            return await res.json();
        } catch (error) {
            console.error('Error updating job:', error);
            throw error; // Re-throw so EditJobPage can handle it
        }
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />} >
                <Route index element={<HomePage />} />
                <Route path='/jobs' element={<JobsPage />} />
                <Route path='jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
                <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
                <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    )
}
export default App
