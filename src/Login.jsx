import { signInWithGoogle } from "./firebase.js";
import "./Login.css";

const Login = ()=>{
    return <div className="login"> 
    <div ><span className="material-icons">slideshow</span></div>
    <h1> Welcome To Reels! </h1>
    <button onClick={()=>{signInWithGoogle();}} className="login-btn btn btn-lg btn-primary mt-2" >Login in with Google</button>
    </div>;
}

export default Login;