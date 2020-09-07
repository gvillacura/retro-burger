import React from "react";
import { ContentHeader } from "./InitialView";
import { Almuerzo, Desayuno } from "../data/menu.json";

export class ContentMenuOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleIndexButtonClicked = this.handleIndexButtonClicked.bind(this);
    this.handleIndexButtonSubmenu = this.handleIndexButtonSubmenu.bind(this);
    this.state = {
      indexButtonClicked: undefined,
      menuClicked: undefined,
      submenuProteinClicked: undefined,
      orderTable: [],
    };
  }
  handleIndexButtonClicked(indexButtonClicked, menuClicked) {
    this.setState({
      indexButtonClicked: indexButtonClicked,
      menuClicked: menuClicked,
    });
    if (menuClicked === "almuerzo") {
      if (Almuerzo[indexButtonClicked].cantidad === 0) {
        this.setState((state) => {
          const actualOrder = state.orderTable.concat(
            Almuerzo[indexButtonClicked]
          );
          return { orderTable: actualOrder };
        });
        Almuerzo[indexButtonClicked].cantidad = 1;
      } else {
        Almuerzo[indexButtonClicked].cantidad += 1;
      }
    }
  }
  handleIndexButtonSubmenu(submenuProteinClicked) {
    this.setState({
      submenuProteinClicked: submenuProteinClicked,
    });
  }

  render() {
    return (
      <div>
        <Menu
          indexButtonClicked={this.state.indexButtonClicked}
          onHandleIndexButtonClicked={this.handleIndexButtonClicked}
          menuClicked={this.state.menuClicked}
          submenuProteinClicked={this.state.submenuProteinClicked}
          onHandleIndexButtonSubmenu={this.handleIndexButtonSubmenu}
        />
        <OrderDetail
          className="containerOrderDetail"
          indexButtonClicked={this.state.indexButtonClicked}
          menuClicked={this.state.menuClicked}
          orderTable={this.state.orderTable}
          submenuClicked={this.state.submenuClicked}
        />
      </div>
    );
  }
}

const OrderDetail = (props) => {
  const orderList = props.orderTable.map((item) => {
    return (
      <div key={item.nombre}>
        {item.cantidad}
        {item.nombre}
        {item.precio}
      </div>
    );
  });

  return <div>{orderList}</div>;
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLunch = this.handleClickLunch.bind(this);
    this.handleClickBreakfast = this.handleClickBreakfast.bind(this);
    this.state = { optionMenu: "lunch" };
  }
  handleClickLunch() {
    this.setState({ optionMenu: "lunch" });
  }
  handleClickBreakfast() {
    this.setState({ optionMenu: "breakfast" });
  }

  render() {
    let allFood =
      this.state.optionMenu === "lunch" ? (
        <MenuLunch
          indexButtonClicked={this.props.indexButtonClicked}
          submenuProteinClicked={this.props.submenuProteinClicked}
          menuClicked={this.props.menuClicked}
          onHandleIndexButtonClickedChildren={
            this.props.onHandleIndexButtonClicked
          }
          onHandleIndexButtonSubmenuChildren={
            this.props.onHandleIndexButtonSubmenu
          }
        />
      ) : (
        <MenuBreakfast />
      );
    // para tener distintos colores en pestaña menu y almuerzo
    let classMenuLunch =
      this.state.optionMenu === "lunch" ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast =
      this.state.optionMenu === "breakfast" ? "buttonMenuOn" : "buttonMenuOff";
    console.log();

    return (
      <div>
        <ContentHeader />
        <button className={classMenuLunch} onClick={this.handleClickLunch}>
          Almuerzo
        </button>
        <button
          className={classMenuBreakfast}
          onClick={this.handleClickBreakfast}
        >
          Desayuno
        </button>
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
    this.setState({ activeButton: index });
  }
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClickedChildren(index, "almuerzo");
  }

  render() {
    return (
      <div className="containerViewButtonsMenu">
        <div className="containerButtonsMenu">
          <button
            onClick={() => {
              this.showIngredientsWithClick(0);
              this.catchIndexButtonClicked(0);
            }}
            className="buttonMainMenu buttonMenu"
          >
            {Almuerzo[0].nombre}
            <br />
            {Almuerzo[0].precio}
          </button>
          <button
            onClick={() => {
              this.showIngredientsWithClick(1);
              this.catchIndexButtonClicked(1);
            }}
            className="buttonMainMenu buttonMenu"
          >
            {Almuerzo[1].nombre}
            <br />
            {Almuerzo[1].precio}
          </button>
          {this.state.activeButton === 0 && (
            <SubMenu
              activeButton={this.state.activeButton}
              submenuClicked={this.props.submenuClicked}
              onHandleIndexButtonSubmenuGrandchild={
                this.props.onHandleIndexButtonSubmenuChild
              }
            />
          )}
          {this.state.activeButton === 1 && (
            <SubMenu
              activeButton={this.state.activeButton}
              submenuClicked={this.props.submenuClicked}
              onHandleIndexButtonSubmenuGrandchild={
                this.props.onHandleIndexButtonSubmenuChild
              }
            />
          )}
          <button
            className="buttonSidesMenu buttonMenu"
            onClick={() => this.catchIndexButtonClicked(2)}
          >
            {Almuerzo[2].nombre}
            <br />
            {Almuerzo[2].precio}
          </button>
          <button
            className="buttonSidesMenu buttonMenu"
            onClick={() => this.catchIndexButtonClicked(3)}
          >
            {Almuerzo[3].nombre}
            <br />
            {Almuerzo[3].precio}
          </button>
          <button
            className="buttonDrinkMenu buttonMenu"
            onClick={() => this.catchIndexButtonClicked(4)}
          >
            {Almuerzo[4].nombre}
            <br />
            {Almuerzo[4].precio}
          </button>
          <button
            className="buttonDrinkMenu buttonMenu"
            onClick={() => this.catchIndexButtonClicked(5)}
          >
            {Almuerzo[5].nombre}
            <br />
            {Almuerzo[5].precio}
          </button>
          <button
            className="buttonDrinkMenu buttonMenu"
            onClick={() => this.catchIndexButtonClicked(6)}
          >
            {Almuerzo[6].nombre}
            <br />
            {Almuerzo[6].precio}
          </button>
          <button
            className="buttonDrinkMenu buttonMenu"
            onClick={() => this.catchIndexButtonClicked(7)}
          >
            {Almuerzo[7].nombre}
            <br />
            {Almuerzo[7].precio}
          </button>
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
          <button className="buttonMainMenu buttonMenu">
            {Desayuno[0].nombre}
            <br />
            {Desayuno[0].precio}
          </button>
          <button className="buttonMainMenu buttonMenu">
            {Desayuno[1].nombre}
            <br />
            {Desayuno[1].precio}
          </button>
          <button className="buttonDrinkMenu buttonMenu">
            {Desayuno[2].nombre}
            <br />
            {Desayuno[2].precio}
          </button>
          <button className="buttonDrinkMenu buttonMenu">
            {Desayuno[3].nombre}
            <br />
            {Desayuno[3].precio}
          </button>
          <button className="buttonDrinkMenu buttonMenu">
            {Desayuno[4].nombre}
            <br />
            {Desayuno[4].precio}
          </button>
          <button className="buttonDrinkMenu buttonMenu">
            {Desayuno[5].nombre}
            <br />
            {Desayuno[5].precio}
          </button>
          <button className="buttonDrinkMenu buttonMenu">
            {Desayuno[6].nombre}
            <br />
            {Desayuno[6].precio}
          </button>
          <button className="buttonDrinkMenu buttonMenu">
            {Desayuno[7].nombre}
            <br />
            {Desayuno[7].precio}
          </button>
        </div>
      </div>
    );
  }
}

class SubMenu extends React.Component {
  catchIndexSubmenuProteinClicked = (index) => {
    this.props.onHandleIndexButtonSubmenuGrandchild(index);
  };

  render() {
    return (
      <div className="containerButtonsSubMenu">
        <div>
          <button
            className="buttonSubMenu"
            onClick={() => this.catchIndexSubmenuProteinClicked(0)}
          >
            {Almuerzo[this.props.activeButton].proteina[0]}
          </button>
          <button
            className="buttonSubMenu"
            onClick={() => this.catchIndexSubmenuProteinClicked(1)}
          >
            {Almuerzo[this.props.activeButton].proteina[1]}
          </button>
          <button
            className="buttonSubMenu"
            onClick={() => this.catchIndexSubmenuProteinClicked(2)}
          >
            {Almuerzo[this.props.activeButton].proteina[2]}
          </button>
        </div>
        <div>
          <button className="buttonSubMenu">
            {Almuerzo[this.props.activeButton].agregado.huevo[0]}
            <br />
            {Almuerzo[this.props.activeButton].agregado.huevo[1]}
          </button>
          <button className="buttonSubMenu">
            {Almuerzo[this.props.activeButton].agregado.queso[0]}
            <br />
            {Almuerzo[this.props.activeButton].agregado.queso[1]}
          </button>
        </div>
        <div className="containerbuttonSubMenuReady">
          <button className="buttonSubMenuReady">LISTO</button>
        </div>
      </div>
    );
  }
}
