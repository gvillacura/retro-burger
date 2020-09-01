import React from 'react';
import {
  Link
} from "react-router-dom";
import logo from '../media/logo.png';
import bell from '../media/bell-off.png'
export class ContentHeader extends React.Component{
  render(){
    return(
      <header className=""> 
        <img src={logo} className="" alt="logo" />
        <img src={bell} className="" alt="logo" />
      </header>
    );  
  }
} 

export class View extends React.Component {
  render() {
    return ( 
      <div>
        <ContentHeader />
        <Link to="/mesero"><button className="">Mesero</button></Link>
        <Link to="/cocinero"><button className="">Cocinero</button></Link>
      </div>
    );
  }
}