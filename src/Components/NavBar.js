import { NavLink } from "react-router-dom"


function NavBar({currentUser}){
    let informationPath = currentUser ? '/signout':"/signin";
    let label = currentUser ? 'Log Out':"Sign In";
    return <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        {(currentUser)? <NavLink to="/add_movie">Add New Movie</NavLink>: null}
        <NavLink to={informationPath}>{label}</NavLink>
    </nav>
}
export default NavBar;
