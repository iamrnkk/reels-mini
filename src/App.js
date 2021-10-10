import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";

const App= ()=> {
  return (
    <>
    <AuthProvider>
    <Router>
        <Switch>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/profile"><Profile/></Route>
          
        </Switch>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
