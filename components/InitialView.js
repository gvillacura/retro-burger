import React from "react";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";

export class ContentHeaderKitchen extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="containerLogo">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </header>
    );
  }
}

export class View extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: "#c7c2c2" }}>
        <ContentHeaderKitchen />
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
