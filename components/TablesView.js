import React from 'react';
import {
  Link
} from "react-router-dom";
import { ContentHeader } from './InitialView';

export class Tables extends React.Component {
  constructor(props){
    super(props)
    this.tableChoose=this.tableChoose.bind(this)
  }
  tableChoose(event){
    sessionStorage.setItem('table', JSON.stringify({
      table: event.target.value,
    }));
  }
  
  render() { 
    return (
      <div>
        <ContentHeader />
        <div className="containerTablesView">
          <div className="containerButtonsTables">
            <Link to="/mesero/mesa"><button className="buttonsTables" value="MESA 1" onClick={this.tableChoose}>Mesa 1</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables" value="MESA 2" onClick={this.tableChoose}>Mesa 2</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables" value="MESA 3" onClick={this.tableChoose}>Mesa 3</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables" value="MESA 4" onClick={this.tableChoose}>Mesa 4</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables" value="MESA 5" onClick={this.tableChoose}>Mesa 5</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables" value="MESA 6" onClick={this.tableChoose}>Mesa 6</button></Link>
          </div>
        </div>
      </div>
    );
  }
}