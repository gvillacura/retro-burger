import React from 'react';
import { ContentHeader } from './InitialView';
import { Almuerzo, Desayuno, proteina, agregado } from '../data/menu.json';


export class ContentMenuOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleIndexButtonClicked = this.handleIndexButtonClicked.bind(this);
    this.state = { indexButtonClicked: undefined,
                    listaOrden:[] 
                  }
  }
  handleIndexButtonClicked(indexButtonClicked) {
    this.setState((state) =>{
       const list = state.listaOrden.concat(indexButtonClicked)
      return {listaOrden: list}
    })
  };
  render() {
    return (
      <div>
        <Menu indexButtonClicked={this.state.indexButtonClicked} onHandleIndexButtonClicked={this.handleIndexButtonClicked} />
        <OrderDetail indexButtonClicked={this.state.listaOrden} />
      </div>
    );
  }
};

class OrderDetail extends React.Component {

  render() {
    return (
      <div>{this.props.indexButtonClicked}</div>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLunch = this.handleClickLunch.bind(this);
    this.handleClickBreakfast = this.handleClickBreakfast.bind(this);
    this.state = { optionMenu: "lunch" }
  }
  handleClickLunch() {
    this.setState({ optionMenu: "lunch" })
  }
  handleClickBreakfast() {
    this.setState({ optionMenu: "breakfast" })
  }

  render() {
    let allFood = this.state.optionMenu === "lunch" ? <MenuLunch 
    indexButtonClicked={this.props.indexButtonClicked} 
    onHandleIndexButtonClicked={this.props.onHandleIndexButtonClicked} /> : <MenuBreakfast />;
    // para tener distintos colores en pestaña menu y almuerzo 
    let classMenuLunch = this.state.optionMenu === "lunch" ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast = this.state.optionMenu === "breakfast" ? "buttonMenuOn" : "buttonMenuOff";
    console.log()

    return (
      <div>
        <ContentHeader />
        <button className={classMenuLunch} onClick={this.handleClickLunch}>Almuerzo</button>
        <button className={classMenuBreakfast} onClick={this.handleClickBreakfast}>Desayuno</button>
        {allFood}
      </div>
    );
  }
}


class MenuLunch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeButton: undefined };
  }
  // listenButtons = (e) =>{
  //   console.log(e.target.value) 
  // }
  showIngredientsWithClick(index) {
    this.setState({ activeButton: index })
  }
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClicked(index)
  }


  render() {
    return (
      <div className="containerViewButtonsMenu">
        <div className="containerButtonsMenu">
          <button onClick={() => this.showIngredientsWithClick(0)} className="buttonMainMenu buttonMenu" >
            {Almuerzo[0].nombre}<br />
            {Almuerzo[0].precio}</button>
          <button onClick={() => this.showIngredientsWithClick(1)} className="buttonMainMenu buttonMenu">
            {Almuerzo[1].nombre}<br />
            {Almuerzo[1].precio}</button>
          {this.state.activeButton === 0 && <SubMenu />}
          {this.state.activeButton === 1 && <SubMenu />}
          <button className="buttonSidesMenu buttonMenu" onClick={() => this.catchIndexButtonClicked(2)}>{Almuerzo[2].nombre}<br />
            {Almuerzo[2].precio}</button>
          <button className="buttonSidesMenu buttonMenu" onClick={() => this.catchIndexButtonClicked(3)}>{Almuerzo[3].nombre}<br />
            {Almuerzo[3].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" onClick={() => this.catchIndexButtonClicked(4)}>{Almuerzo[4].nombre}<br />
            {Almuerzo[4].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" onClick={() => this.catchIndexButtonClicked(5)}>{Almuerzo[5].nombre}<br />
            {Almuerzo[5].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" onClick={() => this.catchIndexButtonClicked(6)}>{Almuerzo[6].nombre}<br />
            {Almuerzo[6].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" onClick={() => this.catchIndexButtonClicked(7)}>{Almuerzo[7].nombre}<br />
            {Almuerzo[7].precio}</button>
        </div>
      </div>
    );
  }
}

class MenuBreakfast extends React.Component {
  render() {
    return (
      <div className="containerViewButtonsMenu">
        <div className="containerButtonsMenu">
          <button className="buttonMainMenu buttonMenu">{Desayuno[0].nombre}<br />
            {Desayuno[0].precio}</button>
          <button className="buttonMainMenu buttonMenu">{Desayuno[1].nombre}<br />
            {Desayuno[1].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Desayuno[2].nombre}<br />
            {Desayuno[2].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Desayuno[3].nombre}<br />
            {Desayuno[3].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Desayuno[4].nombre}<br />
            {Desayuno[4].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Desayuno[5].nombre}<br />
            {Desayuno[5].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Desayuno[6].nombre}<br />
            {Desayuno[6].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Desayuno[7].nombre}<br />
            {Desayuno[7].precio}</button>
        </div>
      </div>
    );
  }
}

class SubMenu extends React.Component {
  render() {
    return (
      <div className="containerButtonsSubMenu">
        <div>
          <button className="buttonSubMenu">{proteina[0]}</button>
          <button className="buttonSubMenu">{proteina[1]}</button>
          <button className="buttonSubMenu">{proteina[2]}</button>
        </div>
        <div>
          <button className="buttonSubMenu">{agregado.huevo[0]}<br />
            {agregado.huevo[1]}</button>
          <button className="buttonSubMenu">{agregado.queso[0]}<br />
            {agregado.queso[1]}</button>
        </div>
        <div className="containerbuttonSubMenuReady">
          <button className="buttonSubMenuReady">LISTO</button>
        </div>
      </div>
    );
  }
}
