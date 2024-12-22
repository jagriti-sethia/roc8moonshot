import React from 'react'
import './homepage.css'; // Import the CSS file
import Filter from '../components/filter'
import { useUserContext } from "../contexts/usercontext"; // Adjust the import path as necessary
import GraphComponent from '../components/chartcomp'

const Homepage = () => {
    const { user, logoutUser, loading, error, isAuthenticated } = useUserContext();
    return (
        <div>

            <header>
                <h1>Welcome   {user}</h1>
                <button onClick={logoutUser}>logout</button>
            </header>
            <Filter />
            <GraphComponent />
        </div>

    )
}

export default Homepage