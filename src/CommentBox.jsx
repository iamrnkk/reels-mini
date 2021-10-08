import { useContext, useEffect, useState } from "react";
import { authContext } from "./AuthProvider";
import "./CommentBox.css";
import { firestore } from "./firebase";
import UserComment from "./userComment";
import { commentBoxOpenContext } from "./VideoCard";


const CommentBox= ()=>{
    let user= useContext(authContext);
    let valueObject= useContext(commentBoxOpenContext);
    let [currUserComment, setCurrUserComment]= useState("");
    let [comments,setComments]=useState([]);

    useEffect(()=>{

        let arr= valueObject.data.comments;
        let commentArr=[]
        const f= async()=>{
            for (const commentId of arr) {
                let commentDoc= await firestore.collection("comments").doc(commentId).get();
                commentArr.push(commentDoc.data());
            }
            setComments(commentArr);
        };
        if(arr) f();
    },[valueObject.data])

    return <div className="comment-box rounded-top">
    <div className="comment-box-header"><span className="material-icons ml-2" onClick={()=>{valueObject.openCommentBox(false)}}>chevron_left</span>Comments</div>
    <div className="comment-box-body">
        {comments.map((e)=>{
            return <UserComment key={e.id} commentData={e}/>
        })}
    </div>
    <div className="input-group post-box">
        <input placeholder="Comment.." className="form-control m-2" value={currUserComment} onChange={(e)=>{setCurrUserComment(e.currentTarget.value)}} ></input>
        <div className="input-group-append">
            <button onClick={async (e)=>{
                const commentDocRef=await firestore.collection("comments").add({
                    name: user.displayName,
                    comment: currUserComment,
                    photo: user.photoURL
                });

                setCurrUserComment("");
                const commentDoc= await commentDocRef.get();
                const commentId= commentDoc.id;
                commentDocRef.set({
                    id: commentId,
                    name: user.displayName,
                    comment: currUserComment,
                    photo: user.photoURL});
                
                const postDoc= await firestore.collection("posts").doc(valueObject.data.id).get();
                let commentsArr=postDoc.data().comments;
                console.log(commentId);
                commentsArr.push(commentId);

                await firestore.collection("posts").doc(valueObject.data.id).update({ comments: commentsArr});

            }} 
            className="post-button btn btn-primary m-2">
            Post
            </button>
        </div>
    </div>
</div>
}

export default CommentBox;