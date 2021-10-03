import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Home from "./Home";
import Login from "./Login";

const App= ()=> {
  return (
    <>
    <AuthProvider>
    <Router>
        <Switch>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/"><Home/></Route>
        </Switch>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
