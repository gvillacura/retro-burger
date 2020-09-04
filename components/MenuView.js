import React from 'react';
import { ContentHeader } from './InitialView';
import { Almuerzo, Desayuno, proteina, agregado } from '../data/menu.json';


export class ContentMenuOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleIndexButtonClicked = this.handleIndexButtonClicked.bind(this);
    this.state = { indexButtonClicked: undefined, menuClicked: undefined }
  }
  handleIndexButtonClicked(indexButtonClicked,menuClicked) {
    this.setState({ indexButtonClicked: indexButtonClicked, menuClicked: menuClicked  })   
  }
  render() {

    return (
      <div>
        <Menu 
          indexButtonClicked={this.state.indexButtonClicked} 
          onHandleIndexButtonClicked={this.handleIndexButtonClicked} 
          menuClicked={this.state.menuClicked} />
        <OrderDetail 
          indexButtonClicked={this.state.indexButtonClicked} 
           menuClicked={this.state.menuClicked} />
      </div>
    );
  }
}

class OrderDetail extends React.Component {
  // constructor(props){ 
  //   super(props);
  //   this.orderDetailChange = this.orderDetailChange.bind(this);
  //   this.state = {orderTable: "oli"}  
  // }
  // orderDetailChange(){
  // if(this.props.menuClicked === "Almuerzo"){
  //   // let order = [];
  //   this.setState( {orderTable : "shao"})
  //    console.log('this.state.orderTable')
  //   //  order.push(Almuerzo[parseInt(this.props.indexButtonClicked)])
  //   }
  // }
  
  render() {  
    
    let oli =Almuerzo[parseInt(this.props.indexButtonClicked)]
    order.push(oli);
    const oli = () =>{

    }
  
    console.log(order)
    return(
      <div >  
        oli
      </div>
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
    let allFood = this.state.optionMenu === "lunch" ? 
    <MenuLunch 
      indexButtonClicked={this.props.indexButtonClicked} 
      menuClicked={this.props.menuClicked} 
      onHandleIndexButtonClickedChildren={this.props.onHandleIndexButtonClicked}  /> : 
    <MenuBreakfast />;
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
  showIngredientsWithClick(index) {
    this.setState({ activeButton: index })
  }
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClickedChildren(index,"almuerzo")
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

