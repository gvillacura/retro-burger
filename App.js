import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { View } from './components/InitialView.js';
import { Tables } from './components/TablesView.js';
import { Menu } from './components/MenuView.js'
import { Kitchen } from './components/KitchenView.js'

class App extends React.Component {
  render(){
    return (
    <Router>   
      <Switch>
        <Route exact path="/">
          <View />
        </Route>
        <Route exact path="/mesero">
          <Tables />
        </Route>
        <Route exact path="/mesero/mesa">
          <Menu />
        </Route>
        <Route exact path="/cocinero">
          <Kitchen />
        </Route>
      </Switch>
    </Router>
  );
  };
}
export default App;

