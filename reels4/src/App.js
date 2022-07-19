// import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext';
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Ioa from './Components/Ioa';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route  path='/login' component={Login} />
          <Route  path='/signup' component={Signup}/>
          <PrivateRoute  path= "/profile/:id" component={Profile}/>
          <PrivateRoute  path="/" component={Feed} />
        </Switch>
      </AuthProvider>
      {/* <Signup /> */}
      {/* <Login /> */}
    </Router>
    // <Ioa/>
  );
}

export default App;

// To deploy on firebase
// npm install firebase_tools -g
// firebase login
// firebase init
// y
// Hosting: Configure files for Firebase Hosting and (optionally) set up Gi
// tHub Action deploys
// use existing project
// project name
// build
// N
// N
// npm run build
// firebase deploy
