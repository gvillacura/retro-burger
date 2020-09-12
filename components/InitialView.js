import React from "react";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";

export class ContentHeaderKitchen extends React.Component {
  render() {
    const currentRoute = window.location.pathname;
    return (
      <header className="header">
        <div className="containerLogo">
          {
            currentRoute !== '/mesero' && <div>
              <GoBack />
            </div>
          }
          <img src={logo} className="logo" alt="logo" />
        </div>
      </header>
    );
  }
}


class GoBack extends React.Component {
  render() {
    return (
      <Link to="/mesero"><i className="fas fa-chevron-left"></i></Link>
    )
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
