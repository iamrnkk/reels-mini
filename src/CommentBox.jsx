import { useContext } from "react";
import "./CommentBox.css";
import UserComment from "./userComment";
import { commentBoxOpenContext } from "./VideoCard";


const CommentBox= ()=>{
    let valueObject= useContext(commentBoxOpenContext);
    return <div className="comment-box rounded-top">
    <div className="comment-box-header"><span class="material-icons ml-2" onClick={()=>{valueObject.openCommentBox(false)}}>chevron_left</span>Comments</div>
    <UserComment/>
    <div className="input-group post-box">
    <input placeholder="Comment.." className="form-control m-2" ></input>
    <div className="input-group-append"><button className="post-button btn btn-primary m-2">Post</button></div>
    </div>
</div>
}

export default CommentBox;