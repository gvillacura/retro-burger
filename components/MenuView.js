import React from 'react';
import {ContentHeader} from './InitialView';
import { Almuerzo, Desayuno, proteina, agregado} from '../data/menu.json';

export class Menu extends React.Component {
  constructor(props){
    super(props);
    this.handleClickLunch=this.handleClickLunch.bind(this);
    this.handleClickBreakfast=this.handleClickBreakfast.bind(this);
    this.state={optionMenu: "lunch"}
  }
  handleClickLunch(){
    this.setState({optionMenu: "lunch"})
  }
  handleClickBreakfast(){
    this.setState({optionMenu: "breakfast"})
  }
  render() {
    let allFood;

    if(this.state.optionMenu === "lunch"){
      allFood= <MenuAlmuerzo />
    }
    else{
      allFood= <MenuDesayuno />
    }
    return ( 
      <div>
        <ContentHeader />
        <button onClick={this.handleClickLunch}>Almuerzo</button>
        <button onClick={this.handleClickBreakfast}>Desayuno</button>
        {allFood}
      </div> 
    );
  }
}

class MenuAlmuerzo extends React.Component {
  render() {
    return(
      <div>
        <button className="">{Almuerzo[0].nombre}<br/>
        {Almuerzo[0].precio}</button>
        <SubMenu />
        <button className="">{Almuerzo[1].nombre}<br/>
        {Almuerzo[1].precio}</button>
        <SubMenu />
        <button className="">{Almuerzo[2].nombre}<br/>
        {Almuerzo[2].precio}</button>
        <button className="">{Almuerzo[3].nombre}<br/>
        {Almuerzo[3].precio}</button>
        <button className="">{Almuerzo[4].nombre}<br/>
        {Almuerzo[4].precio}</button>
        <button className="">{Almuerzo[5].nombre}<br/>
        {Almuerzo[5].precio}</button>
        <button className="">{Almuerzo[6].nombre}<br/>
        {Almuerzo[6].precio}</button>
        <button className="">{Almuerzo[7].nombre}<br/>
        {Almuerzo[7].precio}</button>
      </div>
    );
  }
}

class MenuDesayuno extends React.Component {
  render() {
    return(
      <div>
        <button className="">{Desayuno[0].nombre}<br/>
        {Desayuno[0].precio}</button>
        <button className="">{Desayuno[1].nombre}<br/>
        {Desayuno[1].precio}</button>
        <button className="">{Desayuno[2].nombre}<br/>
        {Desayuno[2].precio}</button>
        <button className="">{Desayuno[3].nombre}<br/>
        {Desayuno[3].precio}</button>
        <button className="">{Desayuno[4].nombre}<br/>
        {Desayuno[4].precio}</button>
        <button className="">{Desayuno[5].nombre}<br/>
        {Desayuno[5].precio}</button>
        <button className="">{Desayuno[6].nombre}<br/>
        {Desayuno[6].precio}</button>
        <button className="">{Desayuno[7].nombre}<br/>
        {Desayuno[7].precio}</button>
      </div>
    );
  }
}

