import "./VideoCard.css";
import { createContext, useContext, useState } from "react";
import CommentBox from "./CommentBox";
import { firestore, storage } from "./firebase";
import { authContext } from "./AuthProvider";

let commentBoxOpenContext= createContext();
const VideoCard= (props)=>{
    const user= useContext(authContext);
    let [playing, setPlaying] = useState(false);
    let [commentBoxOpen, openCommentBox]= useState(false);

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
                        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                            firestore.collection("posts").add({name: user.displayName,url,comments: [],likes: []});
                            });
                    });
                    }}/>
                <label htmlFor="file-upload"><span className="material-icons-outlined upload">add_box</span></label>
                <span className="video-like material-icons">favorite_border</span>
                <span onClick={ ()=>{ if(commentBoxOpen) openCommentBox(false); else openCommentBox(true); }}className="video-comment comment material-icons"><h3>chat_bubble_outline</h3></span>
                <span className="material-icons-outlined account">account_circle</span>
            </div>
            <commentBoxOpenContext.Provider value={{data: props.data,commentBoxOpen, openCommentBox}}>
               {commentBoxOpen? <CommentBox />:"" }
            </commentBoxOpenContext.Provider>
        </div>
    </>
};

export default VideoCard;
export {commentBoxOpenContext};