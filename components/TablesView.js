import React from 'react';
import {
  Link
} from "react-router-dom";
import { ContentHeader } from './InitialView';

export class Tables extends React.Component {
  render() {
    return (
      <div>
        <ContentHeader />
        <div className="containerTablesView">
          <div className="containerButtonsTables">
            <Link to="/mesero/mesa"><button className="buttonsTables">Mesa 1</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables">Mesa 2</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables">Mesa 3</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables">Mesa 4</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables">Mesa 5</button></Link>
            <Link to="/mesero/mesa"><button className="buttonsTables">Mesa 6</button></Link>
          </div>
        </div>
      </div>
    );
  }
}