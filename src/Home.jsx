import { useContext } from "react";
import { auth } from "./firebase";
import { authContext } from "./AuthProvider.js";
import { Redirect } from "react-router-dom";
import "./Home.css";
import VideoCard from "./VideoCard";

const Home= ()=>{
    const user= useContext(authContext);
    console.log(user);
    return <> 
    { user ? "": <Redirect to="/login"/>} 
    <div className="video-container">
        <VideoCard/>
    </div>
    <button onClick={()=>{auth.signOut();}} className="logout-btn material-icons btn btn-lg btn-light rounded-circle mt-2" >logout</button>
    
    </>


};

export default Home;