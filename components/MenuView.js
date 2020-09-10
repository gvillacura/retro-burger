import React from "react";
import { ContentHeader } from "./InitialView";
import { saveOrder } from "../services/MeseroService";
import { Almuerzo, Desayuno } from "../data/menu.json";
import { Link } from "react-router-dom";

export class ContentMenuOrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleIndexButtonClicked = this.handleIndexButtonClicked.bind(this);
    this.state = {
      indexButtonClicked: undefined,
      menuClicked: undefined,
      orderTable: [],
      optionMenu: Almuerzo,
      totalPrice: 0,
    };
  }
  handleIndexButtonClicked(indexButtonClicked, menuClicked, totalPrice) {
    this.setState({
      indexButtonClicked: indexButtonClicked,
      menuClicked: menuClicked,
      totalPrice: totalPrice,
    });
<<<<<<< HEAD
    // construir array de pedidos
    const optionMenu = this.state.optionMenu;
    if (optionMenu[indexButtonClicked].cantidad === 0) {
      this.setState((state) => {
        const actualOrder = state.orderTable.concat(
          optionMenu[indexButtonClicked]
        );
        return { orderTable: actualOrder };
      });
=======
    if (menuClicked === "almuerzo") {
      if (Almuerzo[indexButtonClicked].cantidad === 0) {
        this.setState((state) => {
          const actualOrder = state.orderTable.concat(
            Almuerzo[indexButtonClicked]
          );
          return { orderTable: actualOrder };
        });
        Almuerzo[indexButtonClicked].cantidad = 1;
        Almuerzo[indexButtonClicked].preciototal =
          Almuerzo[indexButtonClicked].precio;
        this.setState((state) => {
          const total = state.orderTable.reduce(
            (totalsum, array) => totalsum + array.preciototal,
            0
          );
          return { totalPrice: total };
        });
      } else {
        Almuerzo[indexButtonClicked].cantidad += 1;
        Almuerzo[indexButtonClicked].preciototal +=
          Almuerzo[indexButtonClicked].precio;
        this.setState((state) => {
          const total = state.orderTable.reduce(
            (totalsum, array) => totalsum + array.preciototal,
            0
          );
          return { totalPrice: total };
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
        Desayuno[indexButtonClicked].preciototal = Desayuno[indexButtonClicked].precio;
        this.setState((state) => {
          const total = state.orderTable.reduce(
            (totalsum, array) => totalsum + array.preciototal, 0);
          return { totalPrice: total };
        });
      } else {
        Desayuno[indexButtonClicked].cantidad += 1;
        Desayuno[indexButtonClicked].preciototal += Desayuno[indexButtonClicked].precio;
        this.setState((state) => {
          const total = state.orderTable.reduce(
            (totalsum, array) => totalsum + array.preciototal,
            0
          );
          return { totalPrice: total };
        });
      }
>>>>>>> changes function reset with two states
    }
    //actualizo cantidad de pedidos y sumo precio total de cada producto
    optionMenu[indexButtonClicked].cantidad += 1;
    optionMenu[indexButtonClicked].preciototal +=
      optionMenu[indexButtonClicked].precio;
    // actualizo el total de todo el pedido
    this.setState((state) => {
      const total = state.orderTable.reduce(
        (totalsum, oli) => totalsum + oli.preciototal,
        0
      );
      return { totalPrice: total };
    });
  }

  // Modificando el estado que se ejecutara en SendOrder
  handleReset = () => {
    const optionMenu = this.state.optionMenu;
    this.setState({ orderTable: [], totalPrice: 0 });

    optionMenu.map((item) => {
      item.cantidad = 0;
      item.preciototal = 0;
    });
  };

  deleteItems = (index) => {
    console.log(index);
    this.setState({
      orderTable: this.state.orderTable.filter((item, idIndex) => {
        console.log(idIndex);
        return idIndex !== index;
      }),
    });
  };

  render() {
    let classMenuLunch =
      this.state.optionMenu === Almuerzo ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast =
      this.state.optionMenu === Desayuno ? "buttonMenuOn" : "buttonMenuOff";
    return (
      <div className="containerAllPage">
        <ContentHeader />
        <button
          className={classMenuLunch}
          onClick={() =>
            this.setState({ optionMenu: Almuerzo, orderTable: [] })
          }
        >
          Almuerzo
        </button>
        <button
          className={classMenuBreakfast}
          onClick={() =>
            this.setState({ optionMenu: Desayuno, orderTable: [] })
          }
        >
          Desayuno
        </button>
        <Menu
          indexButtonClicked={this.state.indexButtonClicked}
          onHandleIndexButtonClicked={this.handleIndexButtonClicked}
          menuClicked={this.state.menuClicked}
          optionMenu={this.state.optionMenu}
        />
        <OrderDetail
          indexButtonClicked={this.state.indexButtonClicked}
          menuClicked={this.state.menuClicked}
          orderTable={this.state.orderTable}
          totalPrice={this.state.totalPrice}
          handleResetW={this.handleReset}
          deleteItems={this.deleteItems}
        />
      </div>
    );
  }
}

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: "" };
  }

  handleChange(event) {
    this.setState({ comments: event.target.value });
  }

  render() {
    const orderList = this.props.orderTable.map((item, idIndex) => {
      return (
        <div className="containerEachOrder" key={item.nombre}>
          <div className="trashOrder">
            <div>
              {item.nombre} x {item.cantidad}
            </div>
            <div>
              <button
                className="btn-trash"
                onClick={() => this.props.deleteItems(idIndex)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <div>
            <button
              className="btn-trash btn-line"
              onClick={() => this.props.handleSubtract(idIndex)}
            >
              -
            </button>
          </div>
          <div className="priceOrder">${item.preciototal}</div>
        </div>
      );
    });
    return (
      <div className="containerViewOrderDetail">
        <div className="containerOrderDetail">
          <div className="containerAllOrders">{orderList}</div>
          <div className="containerInfoBottom">
            <div className="totalPriceOrder">
              Total: ${this.props.totalPrice}
            </div>
            <textarea
              placeholder="Comentarios:"
              rows="4"
              cols="10"
              value={this.state.comments}
              onChange={(event) => this.handleChange(event)}
            ></textarea>
            <SendOrder
              orderToSend={this.props.orderTable}
              priceToSend={this.props.totalPrice}
              handleReset={this.props.handleReset}
              comments={this.state.comments}
            />
          </div>
        </div>
      </div>
    );
  }
}

class SendOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderState: "En proceso", buttonIsDisabled: true };
  }
  componentDidMount() {
    let buttonIsDisabled;
    if (this.props.orderToSend.length !== 0) {
      buttonIsDisabled = false;
    } else {
      buttonIsDisabled = true;
    }
    this.setState({
      orderState: this.state.orderState,
      buttonIsDisabled: buttonIsDisabled,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderToSend !== this.props.orderToSend) {
      let buttonIsDisabled;
      if (this.props.orderToSend.length !== 0) {
        buttonIsDisabled = false;
      } else {
        buttonIsDisabled = true;
      }

      this.setState({
        orderState: this.state.orderState,
        buttonIsDisabled: buttonIsDisabled,
      });
    }
  }

  handleClickSendOrder(orderTable, totalPrice) {
    const stateOrder = this.state.orderState;
    saveOrder(orderTable, totalPrice, stateOrder, this.props.comments);
  }
  render() {
    return (
      <Link to="/mesero">
        <button
          className="btnSendOrder"
          disabled={this.state.buttonIsDisabled}
          onClick={() => {
            this.handleClickSendOrder(
              this.props.orderToSend,
              this.props.priceToSend
            );
            this.props.handleReset();
          }}
        >
          ENVIAR PEDIDO
        </button>
      </Link>
    );
  }
}
class Menu extends React.Component {
  render() {
    let allFood =
      this.props.optionMenu === "lunch" ? (
        <MenuLunch
          indexButtonClicked={this.props.indexButtonClicked}
          menuClicked={this.props.menuClicked}
          onHandleIndexButtonClickedChildren={
            this.props.onHandleIndexButtonClicked
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
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(0)}
        >
          {Almuerzo[0].nombre}
          <br />${Almuerzo[0].precio}
        </button>
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(1)}
        >
          {Almuerzo[1].nombre}
          <br />${Almuerzo[1].precio}
        </button>
        <button
          className="buttonSidesMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(2)}
        >
          {Almuerzo[2].nombre}
          <br />${Almuerzo[2].precio}
        </button>
        <button
          className="buttonSidesMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(3)}
        >
          {Almuerzo[3].nombre}
          <br />${Almuerzo[3].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(4)}
        >
          {Almuerzo[4].nombre}
          <br />${Almuerzo[4].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(5)}
        >
          {Almuerzo[5].nombre}
          <br />${Almuerzo[5].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(6)}
        >
          {Almuerzo[6].nombre}
          <br />${Almuerzo[6].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(7)}
        >
          {Almuerzo[7].nombre}
          <br />${Almuerzo[7].precio}
        </button>
      </div>
    );
  }
}
class MenuBreakfast extends React.Component {
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClicked(index, this.props.optionMenu);
  }
  render() {
    const optionMenu = this.props.optionMenu;
    return (
      <div className="containerTableNameMenu">
        <div className="tableName">
          {JSON.parse(sessionStorage.table).table}
        </div>
        <div>
          <div className="containerButtonsMenu">
            <button
              className="buttonMainMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(0)}
            >
              {optionMenu[0].nombre}
              <br />${optionMenu[0].precio}
            </button>
            <button
              className="buttonMainMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(1)}
            >
              {optionMenu[1].nombre}
              <br />${optionMenu[1].precio}
            </button>
            <button
              className="buttonSidesMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(2)}
            >
              {optionMenu[2].nombre}
              <br />${optionMenu[2].precio}
            </button>
            <button
              className="buttonSidesMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(3)}
            >
              {optionMenu[3].nombre}
              <br />${optionMenu[3].precio}
            </button>
            <button
              className="buttonDrinkMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(4)}
            >
              {optionMenu[4].nombre}
              <br />${optionMenu[4].precio}
            </button>
            <button
              className="buttonDrinkMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(5)}
            >
              {optionMenu[5].nombre}
              <br />${optionMenu[5].precio}
            </button>
            <button
              className="buttonDrinkMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(6)}
            >
              {optionMenu[6].nombre}
              <br />${optionMenu[6].precio}
            </button>
            <button
              className="buttonDrinkMenu buttonMenu"
              onClick={() => this.catchIndexButtonClicked(7)}
            >
              {optionMenu[7].nombre}
              <br />${optionMenu[7].precio}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// class Modal extends React.Component {
//   render() {
//     return (
//       <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
//               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               ...
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//               <button type="button" className="btn btn-primary">Save changes</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
