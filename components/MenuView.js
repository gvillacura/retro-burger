import React from 'react';
import { ContentHeader } from './InitialView';
import { Almuerzo, Desayuno, proteina, agregado } from '../data/menu.json';

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLunch = this.handleClickLunch.bind(this);
    this.handleClickBreakfast = this.handleClickBreakfast.bind(this);
    this.handleClickIngredients = this.handleClickIngredients.bind(this)
    this.state = { optionMenu: "lunch", optionIngredients: false }
  }
  handleClickLunch() {
    this.setState({ optionMenu: "lunch" })
  }
  handleClickBreakfast() {
    this.setState({ optionMenu: "breakfast" })
  }
  handleClickIngredients(optionIngredients){
    this.setState({optionIngredients: optionIngredients})
  }
  
  render() {
      
    let allFood = this.state.optionMenu === "lunch"? <MenuLunch optionIngredients={this.state.optionIngredients} onhandleClickIngredients={this.handleClickIngredients}/> : <MenuBreakfast />;
    // para tener distintos colores en pestaña menu y almuerzo 
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
// export class ShowSubMenu extends React.Component {
//     constructor(props){
//       super(props);
//       this.handleClickIngredients=this.handleClickIngredients.bind(this);
//       this.state={optionIngredients: false};
//     }
//     handleClickIngredients(){
//       this.setState({optionIngredients: true})
//     }
//     render() {
//       let allIngredients = this.state.optionIngredients? <SubMenu />: "";
//       return (
//        <div>
//           <button onClick={this.handleClickIngredients} className="buttonMainMenu buttonMenu">
//             {Almuerzo[0].nombre}<br/>
//             {Almuerzo[0].precio}</button>
//           <button onClick={this.handleClickIngredients} className="buttonMainMenu buttonMenu">
//             {Almuerzo[1].nombre}<br/>
//             {Almuerzo[1].precio}</button>
//             {allIngredients}
//         </div> 
//       );
//     }
//   }

// const BtnItems = (props) => {
//   console.log('props', props)
//   return <button className="buttonMenu" >{props.item.nombre}<br />
//     {props.item.precio}</button>
// }

// const MenuLunch = () => {
//   const optionsMenu = () => Almuerzo.map((items) =>
//     <BtnItems key={items.nombre.toString()} item={items} />
//   );
//   return (
//     <div className="containerViewButtonsMenu">
//         <div className="containerButtonsMenu">
//       <ChooseMenu/>
//     {optionsMenu()}
//     </div>
//  </div>
//   );
// }

// const MenuBreakfast = () => {
//   const optionsMenu = () => Desayuno.map((items) =>
//     <BtnItems key={items.nombre.toString()} item={items} />
//   );
//   return (
//     <div className="containerViewButtonsMenu">
//         <div className="containerButtonsMenu">
//       {optionsMenu()}
//     </div>
// </div>
//   );
// }

class MenuLunch extends React.Component {
  listenButtons = (e) =>{
    console.log(e.target.value) 
  }

  ShowIngredientesWithClick(e){
    this.props.onhandleClickIngredients(false);  
    allIngredients = this.props.optionIngredients ? <SubMenu /> : "";
  }
  render() {
    let allIngredients;
    return (
      <div className="containerViewButtonsMenu">
        <div className="containerButtonsMenu">
          <button onClick={this.ShowIngredientesWithClick} className="buttonMainMenu buttonMenu">
            {Almuerzo[0].nombre}<br/>
            {Almuerzo[0].precio}</button>
          <button onClick={this.props.ShowIngredientesWithClick} className="buttonMainMenu buttonMenu">
            {Almuerzo[1].nombre}<br/>
            {Almuerzo[1].precio}</button>
            {allIngredients}
          <button className="buttonSidesMenu buttonMenu" value={Almuerzo[2].nombre} onClick={(e) => this.listenButtons(e)}>{Almuerzo[2].nombre}<br />
            {Almuerzo[2].precio}</button>
          <button className="buttonSidesMenu buttonMenu" value={Almuerzo[3].nombre} onClick={(e) => this.listenButtons(e)}>{Almuerzo[3].nombre}<br />
            {Almuerzo[3].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" value={Almuerzo[4].nombre} onClick={(e) => this.listenButtons(e)}>{Almuerzo[4].nombre}<br />
            {Almuerzo[4].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" value={Almuerzo[5].nombre} onClick={(e) => this.listenButtons(e)}>{Almuerzo[5].nombre}<br />
            {Almuerzo[5].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" value={Almuerzo[6].nombre} onClick={(e) => this.listenButtons(e)}>{Almuerzo[6].nombre}<br />
            {Almuerzo[6].precio}</button>
          <button className="buttonDrinkMenu buttonMenu" value={Almuerzo[7].nombre} onClick={(e) => this.listenButtons(e)}>{Almuerzo[7].nombre}<br />
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

// class OrderDetails extends React.Component {
//   render() {
//     return(
//       <div>
//         {this.props}
//       </div>
//     );
//   }
// }