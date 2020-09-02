import React from 'react';
import { ContentHeader } from './InitialView';
import { Almuerzo, Desayuno, proteina, agregado } from '../data/menu.json';

export class Menu extends React.Component {
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
    let allFood;
    if (this.state.optionMenu === "lunch") {
      allFood = <MenuAlmuerzo />
    }
    else {
      allFood = <MenuDesayuno />
    }
    let classMenuLunch = this.state.optionMenu === "lunch" ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast = this.state.optionMenu === "breakfast" ? "buttonMenuOn" : "buttonMenuOff";
    return (
      <div>
        <ContentHeader />
        <button className={classMenuLunch} onClick={this.handleClickLunch}>Almuerzo</button>
        <button className={classMenuBreakfast} onClick={this.handleClickBreakfast}>Desayuno</button>
        {allFood}
        <ChooseMenu />
      </div> 

    );
  }
}
export class ChooseMenu extends React.Component {
    constructor(props){
      super(props);
      this.handleClickIngredients=this.handleClickIngredients.bind(this);
      this.state={optionIngredients: false};
    }
    handleClickIngredients(){
      this.setState({optionIngredients: true})
    }
    render() {
      let allIngredients;
  
      if(this.state.optionIngredients){
        allIngredients= <SubMenu />
      }
      else{
        allIngredients= ""
      }
      return ( 
        <div>
            <button onClick={this.handleClickIngredients} className="buttonMainMenu buttonMenu
">{Almuerzo[0].nombre}<br/>
            {Almuerzo[0].precio}</button>
            <button onClick={this.handleClickIngredients} className="buttonMainMenu buttonMenu
">{Almuerzo[1].nombre}<br/>
            {Almuerzo[1].precio}</button>
            {allIngredients}
        </div> 
      );
    }
  }

class MenuAlmuerzo extends React.Component {
  render() {
    return (
      <div className="containerViewButtonsMenu">
        <div className="containerButtonsMenu">
         <ChooseMenu/>
          <button className="buttonSidesMenu buttonMenu">{Almuerzo[2].nombre}<br />
            {Almuerzo[2].precio}</button>
          <button className="buttonSidesMenu buttonMenu">{Almuerzo[3].nombre}<br />
            {Almuerzo[3].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Almuerzo[4].nombre}<br />
            {Almuerzo[4].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Almuerzo[5].nombre}<br />
            {Almuerzo[5].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Almuerzo[6].nombre}<br />
            {Almuerzo[6].precio}</button>
          <button className="buttonDrinkMenu buttonMenu">{Almuerzo[7].nombre}<br />
            {Almuerzo[7].precio}</button>
        </div>
    );
  }
}

class MenuDesayuno extends React.Component {
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
