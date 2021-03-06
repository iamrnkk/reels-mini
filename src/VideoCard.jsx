import "./VideoCard.css";
import { createContext, useContext, useState } from "react";
import CommentBox from "./CommentBox";
import { firestore, storage } from "./firebase";
import { authContext } from "./AuthProvider";
import { Link } from "react-router-dom";

let commentBoxOpenContext= createContext();
const VideoCard= (props)=>{
    const user= useContext(authContext);
    let [playing, setPlaying] = useState(false);
    let [commentBoxOpen, openCommentBox]= useState(false);
    let currUserLiked;
    if(user) currUserLiked=props.data.likes.includes(user.uid);
    return <>
        <div className="video-card">
            <video 
            onClick={(e) => {
            if (playing) {
            e.currentTarget.pause();
            setPlaying(false);
            } else {
            e.currentTarget.play();
            setPlaying(true);
          }}} 
          loop
          src={props.data.url}>

          </video>
            <p className="user-name">{props.data.name}</p>
            <span className="video-card-music">
                <span className="material-icons">music_note</span>
                <marquee>song name</marquee>
            </span>
            <div className="video-card-options">
                <input id="file-upload" type="file" accept="video/*" 
                onClick={(e)=>{e.currentTarget.value=null}}
                onChange={(e)=>{
                    const videoObj=e.currentTarget.files[0];
                    let {name,size}= videoObj;

                    size= size/1000000;
                    if(size>10)
                    {
                        alert("file size exceeds limit");
                        return;
                    }
                    
                    let uploadTask= storage.ref(`/posts/${user.uid}/${Date.now()+"-"+name}`).put(videoObj);
                    uploadTask.on("state_changed",null,null,()=>{
                        uploadTask.snapshot.ref.getDownloadURL().then(async (url)=>{
                            const postsDocRef= await firestore.collection("posts").add({name: user.displayName,url,comments: [],likes: []});
                            const postsDoc=  await postsDocRef.get();
                            const postId= postsDoc.id;

                            const userDoc= await firestore.collection("users").doc(user.uid).get();
                            let postsArr= userDoc.data().posts;
                            postsArr.push(postId);
                            
                            await firestore.collection("users").doc(user.uid).update({posts: postsArr});
                            });
                    });
                    }}/>
                <label htmlFor="file-upload"><span className="material-icons-outlined upload">add_box</span></label>
                <span onClick={()=>{
                    let likesArr=props.data.likes;

                    if(currUserLiked) likesArr= likesArr.filter((el)=>el!==user.uid);
                    else likesArr.push(user.uid);
                    
                    firestore.collection("posts").doc(props.data.id).update({likes:likesArr});
                }} className="video-like material-icons">{currUserLiked? "favorite":"favorite_border"}</span>
                <span onClick={ ()=>{ if(commentBoxOpen) openCommentBox(false); else openCommentBox(true); }}className="video-comment comment material-icons"><h3>chat_bubble_outline</h3></span>
                <Link className="material-icons-outlined account" to="/profile">account_circle</Link>
            </div>
            <commentBoxOpenContext.Provider value={{data: props.data,commentBoxOpen, openCommentBox}}>
               {commentBoxOpen? <CommentBox />:"" }
            </commentBoxOpenContext.Provider>
        </div>
    </>
};

export default VideoCard;
export {commentBoxOpenContext};