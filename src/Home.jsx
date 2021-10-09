import { useContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";
import { authContext } from "./AuthProvider.js";
import { Redirect } from "react-router-dom";
import "./Home.css";
import VideoCard from "./VideoCard";

const Home= ()=>{
    const user= useContext(authContext);
    let [posts, setPosts]= useState([]);
    useEffect(()=>{
        let unsub=firestore.collection("posts").onSnapshot((querySnapshot)=>{
            let docArr= querySnapshot.docs;
            let arr=[];
            for (const doc of docArr) {
                arr.push({id: doc.id,...doc.data()});
            }
            setPosts(arr);
        });
        
        return ()=>{unsub()};
    },[]);


    return <> 
    { user ? "": <Redirect to="/login"/>} 
    <div className="video-container">
        {posts.map((el)=>{return <VideoCard key={el.id} data={el}/>})}
    </div>
    <button onClick={()=>{auth.signOut();}} className="logout-btn material-icons btn btn-lg btn-light rounded-circle mt-2" >logout</button>
    
    </>


};

export default Home;