import { useContext } from "react";
import { authContext } from "./AuthProvider.js";
import { signInWithGoogle } from "./firebase.js";
import { Redirect } from "react-router-dom";
import "./Login.css";

const Login = ()=>{
    const user= useContext(authContext);
    console.log(user);

    return <>
            { user ? <Redirect to="/"/> : ""}
            <div className="login"> 
                <div className="reels-icon"> <span className="material-icons">slideshow</span> </div>
                <h1> Welcome To Reels! </h1>
                <button onClick={()=>{signInWithGoogle();}} className="login-btn btn btn-lg btn-primary mt-2" >Login in with Google</button>
            </div>
          </>;
}

export default Login;