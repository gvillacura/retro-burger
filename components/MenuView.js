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

const BtnItems = (props) => {
  console.log('props', props)
  return <button>{props.item.nombre}<br />
    {props.item.precio}</button>
}

const MenuLunch = () => {
  const optionsMenu = () => Almuerzo.map((items) =>
    <BtnItems key={items.nombre.toString()} item={items} />
  );
  return (
    <div>
      {optionsMenu()}
    </div>
  );
}

const MenuBreakfast = () => {
  const optionsMenu = () => Desayuno.map((items) =>
    <BtnItems key={items.nombre.toString()} item={items} />
  );
  return (
    <div>
      {optionsMenu()}
    </div>
  );
}

class SubMenu extends React.Component {
  render() {
    return (
      <div>
        <button className="">{proteina[0]}</button>
        <button className="">{proteina[1]}</button>
        <button className="">{proteina[2]}</button>
        <button className="">{agregado.huevo[0]}<br />
          {agregado.huevo[1]}</button>
        <button className="">{agregado.queso[0]}<br />
          {agregado.queso[1]}</button>
        <button className="">Listo</button>
      </div>
    );
  }
}