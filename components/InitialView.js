import React from "react";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";
import bell from "../media/bell-off.png";

export class ContentHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="containerLogo">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="containerBellOf">
          <img src={bell} className="bellOff" alt="bell" />
        </div>
      </header>
    );
  }
}

export class View extends React.Component {
  render() {
    return (
      <div>
        <ContentHeader />
        <div className="containerButtonsInitial">
          <Link to="/mesero">
            <button className="buttonsInitial">Mesero</button>
          </Link>
          <Link to="/cocinero">
            <button className="buttonsInitial">Cocinero</button>
          </Link>
        </div>
      </div>
    );
  }
}
