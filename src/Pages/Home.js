import NavBar from "../Components/NavBar"
import {Outlet} from "react-router-dom"

function Home({currentUser}){
    return <>
        <NavBar currentUser={currentUser}/>
        <Outlet />
        <br></br>
        <br></br>
    </>
}

export default Home