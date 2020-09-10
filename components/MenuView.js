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
      optionMenu: "lunch",
      totalPrice: 0,
    };
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
        Almuerzo[indexButtonClicked].cantidad = 1;
        Almuerzo[indexButtonClicked].preciototal =
          Almuerzo[indexButtonClicked].precio;
        this.setState((state) => {
          const total = state.orderTable.reduce(
            (totalsum, oli) => totalsum + oli.preciototal,
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
            (totalsum, oli) => totalsum + oli.preciototal,
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
      } else {
        Desayuno[indexButtonClicked].cantidad += 1;
      }
    }
  }

  // Modificando el estado que se ejecutara en SendOrder
  handleResetOrder = () => {
    this.setState({ orderTable: [] })
  }

  handleResetPrice = () => {
    this.setState({ totalPrice: 0 })
  }

  deleteItems = (index) => {
    console.log(index)
    this.setState({
      orderTable: this.state.orderTable.filter((item, idIndex) => {
        console.log(idIndex)
        return idIndex !== index
      })
    });
  }

  // handleSubtract = (index) => {
  //   this.setState({
  //     orderTable: this.state.orderTable.filter(function (item, id) {
  //       if (item.cantidad += 1) {
  //         return id !== index
  //       }
  //       return id !== index
  //     })
  //   });
  // }

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
          onClick={() => this.setState({ optionMenu: "lunch", orderTable: [] })}
        >
          Almuerzo
        </button>
        <button
          className={classMenuBreakfast}
          onClick={() => this.setState({ optionMenu: "breakfast", orderTable: [] })}
        >
          Desayuno
        </button>
        <div className="tableName">{JSON.parse(sessionStorage.table).table}</div>
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
          handleResetOrder={this.handleResetOrder}
          handleResetPrice={this.handleResetPrice}
          deleteItems={this.deleteItems}
        />
      </div>
    );
  }
}

const OrderDetail = (props) => {
  const orderList = props.orderTable.map((item, idIndex) => {
    return (
      <div className="containerEachOrder" key={item.nombre} >
        <div className="trashOrder">
          <div>
            {item.nombre} x {item.cantidad}
          </div>
          <div>
            <button className="btn-trash" onClick={() => props.deleteItems(idIndex)}><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
        <div>
          <button className="btn-trash btn-line" onClick={() => props.handleSubtract(idIndex)}>-</button>
        </div>
        <div className="priceOrder">${item.preciototal}</div>
      </div>

    );
  });

  return (
    <div className="containerViewOrderDetail">
      <div className="containerOrderDetail">
        <div className="containerAllOrders">
          {orderList}
        </div>
        <div className="containerInfoBottom">
          <div className="totalPriceOrder">Total: ${props.totalPrice}</div>
          <textarea placeholder="Comentarios:" rows="4" cols="10"></textarea>
          <SendOrder
            orderToSend={props.orderTable}
            priceToSend={props.totalPrice}
            handleResetOrder={props.handleResetOrder}
            handleResetPrice={props.handleResetPrice}
          />
        </div>
      </div>
    </div>
  );
};

class SendOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { estadoPedido: "En Proceso" };
  }

  handleClickSendOrder(orderTable, totalPrice) {
    const stateOrder = this.state.estadoPedido;
    this.props.handleResetOrder();
    this.props.handleResetPrice();
    saveOrder(orderTable, totalPrice, stateOrder);
  }

  render() {
    return (

      <Link to="/mesero"><button className="btnSendOrder"
        onClick={() => { this.handleClickSendOrder(this.props.orderToSend, this.props.priceToSend) }}>
        ENVIAR PEDIDO
      </button></Link>
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
          <br />
          ${Almuerzo[0].precio}
        </button>
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(1)}
        >
          {Almuerzo[1].nombre}
          <br />
          ${Almuerzo[1].precio}
        </button>
        <button
          className="buttonSidesMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(2)}
        >
          {Almuerzo[2].nombre}
          <br />
          ${Almuerzo[2].precio}
        </button>
        <button
          className="buttonSidesMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(3)}
        >
          {Almuerzo[3].nombre}
          <br />
          ${Almuerzo[3].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(4)}
        >
          {Almuerzo[4].nombre}
          <br />
          ${Almuerzo[4].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(5)}
        >
          {Almuerzo[5].nombre}
          <br />
          ${Almuerzo[5].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(6)}
        >
          {Almuerzo[6].nombre}
          <br />
          ${Almuerzo[6].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(7)}
        >
          {Almuerzo[7].nombre}
          <br />
          ${Almuerzo[7].precio}
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
          ${Desayuno[0].precio}
        </button>
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(1)}
        >
          {Desayuno[1].nombre}
          <br />
          ${Desayuno[1].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(2)}
        >
          {Desayuno[2].nombre}
          <br />
          ${Desayuno[2].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(3)}
        >
          {Desayuno[3].nombre}
          <br />
          ${Desayuno[3].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(4)}
        >
          {Desayuno[4].nombre}
          <br />
          ${Desayuno[4].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(5)}
        >
          {Desayuno[5].nombre}
          <br />
          ${Desayuno[5].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(6)}
        >
          {Desayuno[6].nombre}
          <br />
          ${Desayuno[6].precio}
        </button>
        <button
          className="buttonDrinkMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(7)}
        >
          {Desayuno[7].nombre}
          <br />
          ${Desayuno[7].precio}
        </button>
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