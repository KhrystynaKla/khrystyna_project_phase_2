import React from "react";
import { useNavigate } from "react-router-dom";

function Signin({handleLogin, handleChange}) {
    const navigate = useNavigate()
    return (
        <div className="login-container"> {/* Use "className" instead of "class" for JSX */}
            <h2>Sign In</h2>
            <form onSubmit={(e)=>{
                handleLogin(e)
                navigate('/movies')
            }}>
                <label htmlFor="username">Username:</label> {/* Use "htmlFor" instead of "for" for JSX */}
                <input onChange={handleChange} type="text" id="username" name="username" placeholder="Enter your username" required autoComplete="username"/>

                <label htmlFor="password">Password:</label>
                <input onChange={handleChange} type="password" id="password" name="password" placeholder="Enter your password" required autoComplete="current-password" inputMode="numeric" minLength="4"/>

                <button onChange={handleChange} type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Signin;