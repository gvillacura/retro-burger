import React from 'react';
import {
  Link
} from "react-router-dom";
import {ContentHeader} from './InitialView';

export class Tables extends React.Component {
    render() {  
      return ( 
         <div>
            <ContentHeader />
            <Link to="/mesero/mesa"><button className="">Mesa 1</button></Link>
            <Link to="/mesero/mesa"><button className="">Mesa 2</button></Link>
            <Link to="/mesero/mesa"><button className="">Mesa 3</button></Link>
            <Link to="/mesero/mesa"><button className="">Mesa 4</button></Link>
            <Link to="/mesero/mesa"><button className="">Mesa 5</button></Link>
            <Link to="/mesero/mesa"><button className="">Mesa 6</button></Link>
        </div> 
      );
    }
  }