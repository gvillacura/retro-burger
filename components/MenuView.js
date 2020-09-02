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
      allFood = <MenuLunch />
    }
    else {
      allFood = <MenuBreakfast />
    }
    let classMenuLunch = this.state.optionMenu === "lunch" ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast = this.state.optionMenu === "breakfast" ? "buttonMenuOn" : "buttonMenuOff";
      
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
            <button onClick={this.handleClickIngredients} className="buttonMainMenu buttonMenu">
              {Almuerzo[0].nombre}<br/>
              {Almuerzo[0].precio}</button>
            <button onClick={this.handleClickIngredients} className="buttonMainMenu buttonMenu">
              {Almuerzo[1].nombre}<br/>
              {Almuerzo[1].precio}</button>
              {allIngredients}
        </div> 
      );
    }
  }

const BtnItems = (props) => {
  console.log('props', props)
  return <button>{props.item.nombre}<br />
    {props.item.precio}</button>
}

const MenuLunch = () => {
  const optionsMenu = () => Almuerzo.map((items) =>
    <BtnItems key={items.nombre.toString()} className="buttonMenu" item={items} />
  );
  return (
    <div className="containerViewButtonsMenu">
        <div className="containerButtonsMenu">
      <ChooseMenu/>
    {optionsMenu()}
    </div>
 </div>
  );

}

const MenuBreakfast = () => {
  const optionsMenu = () => Desayuno.map((items) =>
    <BtnItems key={items.nombre.toString()} className="buttonMenu"> item={items} />
  );
  return (
    <div className="containerViewButtonsMenu">
        <div className="containerButtonsMenu">
      {optionsMenu()}
    </div>
</div>
  );
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

