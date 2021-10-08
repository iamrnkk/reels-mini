import "./UserComment.css";

const UserComment= (props)=>{
    return <div className="user-comment">
    <img className="display-picture rounded-circle m-2" alt="dp" src={props.commentData.photo}/>
    <div className="user-comment-text">
        <h6>{props.commentData.name}</h6>
        <p className="text-truncate">{props.commentData.comment}</p>
    </div>
</div>
};

export default UserComment;