import React from "react";
import { ContentHeader } from "./InitialView";
import { saveOrder } from "../services/MeseroService";
import { Almuerzo, Desayuno, agregado, proteina } from "../data/menu.json";

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
      optionMenu: "lunch",
      totalPrice: 0,
    };
  }
  handleIndexButtonSubmenu(submenuProteinClicked) {
    this.setState({
      submenuProteinClicked: submenuProteinClicked,
    });
  }
  handleIndexButtonClicked(indexButtonClicked, menuClicked, totalPrice) {
    this.setState({
      indexButtonClicked: indexButtonClicked,
      menuClicked: menuClicked,
      totalPrice: totalPrice,
    });
    if (menuClicked === "almuerzo") {
      if (Almuerzo[indexButtonClicked].cantidad === 0) {
        this.setState((state) => {
          const actualOrder = state.orderTable.concat(
            Almuerzo[indexButtonClicked]
          );
          return { orderTable: actualOrder };
        });
        if (indexButtonClicked !== 1 && indexButtonClicked !== 0) {
          Almuerzo[indexButtonClicked].cantidad = 1;
          Almuerzo[indexButtonClicked].preciototal =
            Almuerzo[indexButtonClicked].precio;
        }
        this.setState({
          totalPrice: totalPrice + Almuerzo[indexButtonClicked].preciototal,
        });
      } else {
        Almuerzo[indexButtonClicked].cantidad += 1;
        Almuerzo[indexButtonClicked].preciototal +=
          Almuerzo[indexButtonClicked].precio;
        this.setState({
          totalPrice: totalPrice + Almuerzo[indexButtonClicked].preciototal,
        });
      }
    }
    if (menuClicked === "desayuno") {
      if (Desayuno[indexButtonClicked].cantidad === 0) {
        this.setState((state) => {
          const actualOrder = state.orderTable.concat(
            Desayuno[indexButtonClicked]
          );
          return { orderTable: actualOrder };
        });
        Desayuno[indexButtonClicked].cantidad = 1;
      } else {
        Desayuno[indexButtonClicked].cantidad += 1;
      }
    }
  }

  render() {
    let classMenuLunch =
      this.state.optionMenu === "lunch" ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast =
      this.state.optionMenu === "breakfast" ? "buttonMenuOn" : "buttonMenuOff";
    return (
      <div className="containerAllPage">
        <ContentHeader />
        <button
          className={classMenuLunch}
          onClick={() => this.setState({ optionMenu: "lunch" })}
        >
          Almuerzo
        </button>
        <button
          className={classMenuBreakfast}
          onClick={() => this.setState({ optionMenu: "breakfast" })}
        >
          Desayuno
        </button>
        <Menu
          indexButtonClicked={this.state.indexButtonClicked}
          onHandleIndexButtonClicked={this.handleIndexButtonClicked}
          menuClicked={this.state.menuClicked}
          optionMenu={this.state.optionMenu}
          submenuProteinClicked={this.state.submenuProteinClicked}
          onHandleIndexButtonSubmenu={this.handleIndexButtonSubmenu}
        />
        <OrderDetail
          indexButtonClicked={this.state.indexButtonClicked}
          menuClicked={this.state.menuClicked}
          orderTable={this.state.orderTable}
          submenuClicked={this.state.submenuClicked}
          totalPrice={this.state.totalPrice}
        />
      </div>
    );
  }
}

const OrderDetail = (props) => {
  const orderList = props.orderTable.map((item) => {
    return (
      <div className="containerEachOrder" key={item.nombre}>
        <div>
          {item.nombre} x{item.cantidad}
        </div>
        <div className="priceOrder">${item.preciototal}</div>
      </div>
    );
  });

  return (
    <div className="containerViewOrderDetail">
      <div className="containerOrderDetail">
        {orderList}
        <div>Total: {props.totalPrice}</div>
        <SendOrder orderToSend={props.orderTable} />
      </div>
    </div>
  );
};

class SendOrder extends React.Component {
  handleClickSendOrder(orderTable) {
    saveOrder(orderTable);
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.handleClickSendOrder(this.props.orderToSend);
          }}
        >
          Enviar pedido
        </button>
      </div>
    );
  }
}

class Menu extends React.Component {
  render() {
    let allFood =
      this.props.optionMenu === "lunch" ? (
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
        <MenuBreakfast
          indexButtonClicked={this.props.indexButtonClicked}
          menuClicked={this.props.menuClicked}
          onHandleIndexButtonClickedChildren={
            this.props.onHandleIndexButtonClicked
          }
        />
      );
    return <div className="containerViewButtonsMenu">{allFood}</div>;
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
            submenuProteinClicked={this.props.submenuProteinClicked}
            onHandleIndexButtonSubmenuChildren={
              this.props.onHandleIndexButtonSubmenuChildren
            }
          />
        )}
        {this.state.activeButton === 1 && (
          <SubMenu
            activeButton={this.state.activeButton}
            submenuClicked={this.props.submenuClicked}
            submenuProteinClicked={this.state.submenuProteinClicked}
            onHandleIndexButtonSubmenuChildren={
              this.props.onHandleIndexButtonSubmenuChildren
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
    );
  }
}

class MenuBreakfast extends React.Component {
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClickedChildren(index, "desayuno");
  }
  render() {
    return (
      <div className="containerButtonsMenu">
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(0)}
        >
          {Desayuno[0].nombre}
          <br />
          {Desayuno[0].precio}
        </button>
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(1)}
        >
          {Desayuno[1].nombre}
          <br />
          {Desayuno[1].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(2)}
        >
          {Desayuno[2].nombre}
          <br />
          {Desayuno[2].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(3)}
        >
          {Desayuno[3].nombre}
          <br />
          {Desayuno[3].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(4)}
        >
          {Desayuno[4].nombre}
          <br />
          {Desayuno[4].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(5)}
        >
          {Desayuno[5].nombre}
          <br />
          {Desayuno[5].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(6)}
        >
          {Desayuno[6].nombre}
          <br />
          {Desayuno[6].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(7)}
        >
          {Desayuno[7].nombre}
          <br />
          {Desayuno[7].precio}
        </button>
      </div>
    );
  }
}

class SubMenu extends React.Component {
  catchIndexSubmenuProteinClicked(index) {
    this.props.onHandleIndexButtonSubmenuChildren(index);
  }

  render() {
    return (
      <div className="containerButtonsSubMenu">
        <div>
          <button
            className="buttonSubMenu"
            onClick={() => this.catchIndexSubmenuProteinClicked(0)}
          >
            {proteina[0]}
          </button>
          <button
            className="buttonSubMenu"
            onClick={() => this.catchIndexSubmenuProteinClicked(1)}
          >
            {proteina[1]}
          </button>
          <button
            className="buttonSubMenu"
            onClick={() => this.catchIndexSubmenuProteinClicked(2)}
          >
            {proteina[2]}
          </button>
        </div>
        <div>
          <button className="buttonSubMenu">
            {agregado.huevo[0]}
            <br />
            {agregado.huevo[1]}
          </button>
          <button className="buttonSubMenu">
            {agregado.queso[0]}
            <br />
            {agregado.queso[1]}
          </button>
        </div>
        <div className="containerbuttonSubMenuReady">
          <button className="buttonSubMenuReady">LISTO</button>
        </div>
      </div>
    );
  }
}
