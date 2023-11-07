import React from "react";
import { useNavigate } from "react-router-dom";

function Signout({setCurrentUser}) {
    const navigate = useNavigate()
    const handleLogout = () => {
        setCurrentUser(null)
        navigate('/movies')
    };

    return (
        <div className="logout-container">
            <h2>Are you sure you want to log out?</h2>
            <p>You will not be able to leave comments and like your favorite movies.</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Signout;