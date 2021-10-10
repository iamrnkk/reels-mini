import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import { auth, firestore } from "./firebase";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

import "./Profile.css"
const Profile= ()=>{
    const user= useContext(authContext);
    if(!user) <Redirect to="/login"/>;
    console.log(user);
    let [posts,setPosts]= useState([]);
    useEffect(()=>{
        if(user)
        {
            const postsIdArr= user.posts;
            let postsArr=[];
            const f= async()=>{
                for (const postId of postsIdArr) {
                    let postDoc= await firestore.collection("posts").doc(postId).get();
                    postsArr.push({id: postId, ...postDoc.data()});
                }
                setPosts(postsArr);
            };
            if(postsIdArr) f();
        }
    },[]);
    return <>
        { user ? "": <Redirect to="/login"/>}    
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-picture-holder m"><img className="profile-picture" src={user?user.photoURL:""} alt="profile=pic"/></div>
                <h2 className="display-name m-2">{user?user.displayName:""}</h2>
                <div className="profile-btn-holder m-4">
                    <Link  className="material-icons-outlined profile-btn explore" to="/">explore</Link>
                    <div onClick={()=>{auth.signOut();}} className="material-icons-outlined profile-btn logout">logout</div>
                </div>
            </div>
            <div className="profile-body">
                <h4 className="profile-body-title p-2">Reels</h4>
                <div className="reel-container">
                    {
                        posts.map((e)=>{ return <div className="profile-reel" key={e.id}><video src={e.url}/></div> })
                    }
                    
                </div>
            </div>
        </div>

    </>;
};


export default Profile;