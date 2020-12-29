// import logo from './logo.svg';
import './App.css';
import Barang from './page/Barang'
import Login from './page/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    
      <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Barang}>
          </Route>
          <Route path='/login' component={Login}>
          </Route>
          <Route path='/register' component={Login}>
          </Route>
        </Switch>
      </Router>
      </div>
    
    
  );
}

export default App;
