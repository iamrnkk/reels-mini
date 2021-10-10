import VideoCard from "./VideoCard";
import "./Posts.css"

const Posts= (props)=>{
    console.log(props.data);
    return <> 
    <VideoCard data={props.data.videoCardOpen}/>
    <span class=" back-arrow material-icons-outlined" onClick={ props.data.openVideoCard(null)} >arrow_back</span>
    </>
}

export default Posts;