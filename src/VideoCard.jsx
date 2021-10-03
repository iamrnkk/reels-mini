import "./VideoCard.css";
import { createContext, useState } from "react";
import CommentBox from "./CommentBox";

let commentBoxOpenContext= createContext();
const VideoCard= ()=>{
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
          src="https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4">

          </video>
            <p className="user-name">Fake User</p>
            <span className="video-card-music">
                <span className="material-icons">music_note</span>
                <marquee>song name</marquee>
            </span>
            <span className="video-like material-icons">favorite_border</span>
            <span onClick={ ()=>{ if(commentBoxOpen) openCommentBox(false); else openCommentBox(true); }}className="video-comment comment material-icons"><h3>chat_bubble_outline</h3></span>
            
            <commentBoxOpenContext.Provider value={{commentBoxOpen, openCommentBox}}>
               {commentBoxOpen? <CommentBox />:""}
            </commentBoxOpenContext.Provider>
        </div>
    </>
};

export default VideoCard;
export {commentBoxOpenContext};