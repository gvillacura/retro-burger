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
    console.log("click")
    // construir array de pedidos
    const optionMenu = this.state.optionMenu;
    if ((optionMenu)[indexButtonClicked].cantidad === 0) {
      this.setState((state) => {
        const actualOrder = state.orderTable.concat(optionMenu[indexButtonClicked]);
        return { orderTable: actualOrder };
      });
    }
    //actualizo cantidad de pedidos y sumo precio total de cada producto
    optionMenu[indexButtonClicked].cantidad += 1;
    optionMenu[indexButtonClicked].preciototal += optionMenu[indexButtonClicked].precio;
    // actualizo el total de todo el pedido
    this.setState((state) => {
      const total = state.orderTable.reduce(
        (totalsum, oli) => totalsum + oli.preciototal, 0);
      return { totalPrice: total };
    });
  }

  // Modificando el estado que se ejecutara en SendOrder
  handleReset = () => {
    const optionMenu = this.state.optionMenu;
    this.setState({ orderTable: [], totalPrice: 0 })
    optionMenu.map((item)=> {
      item.cantidad=0
      item.preciototal=0})
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
    let classMenuLunch = this.state.optionMenu === Almuerzo ? "buttonMenuOn" : "buttonMenuOff";
    let classMenuBreakfast = this.state.optionMenu === Desayuno ? "buttonMenuOn" : "buttonMenuOff";
    return (
      <div className="containerAllPage">
        <ContentHeader />
        <button
          className={classMenuLunch}
          onClick={() => this.setState({ optionMenu: Almuerzo, orderTable: [] })}>
          Almuerzo
        </button>
        <button
          className={classMenuBreakfast}
          onClick={() => this.setState({ optionMenu: Desayuno, orderTable: [] })}>
          Desayuno
        </button>
        <div className="tableName">
          {JSON.parse(sessionStorage.table).table}
        </div>
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
          handleReset={this.handleReset}
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
        <div className="containerAllOrders">{orderList}</div>
        <div className="containerInfoBottom">
          <div className="totalPriceOrder">Total: ${props.totalPrice}</div>
          <textarea placeholder="Comentarios:" rows="4" cols="10"></textarea>
          <SendOrder
            orderToSend={props.orderTable}
            priceToSend={props.totalPrice}
            handleReset={props.handleReset}
          />
        </div>
      </div>
    </div>
  );
};

class SendOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderState: "Sin pedido", buttonIsDisabled: true };
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
    this.props.handleReset();
    saveOrder(orderTable, totalPrice, stateOrder);
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
          }}
        >
          ENVIAR PEDIDO
        </button>
      </Link>
    );
  }
}
class Menu extends React.Component {
  catchIndexButtonClicked(index) {
    this.props.onHandleIndexButtonClicked(index, this.props.optionMenu);
  }
  render() {
    const optionMenu= this.props.optionMenu;
    return(
    <div className="containerViewButtonsMenu">
      <div className="containerButtonsMenu">
        <button
          className="buttonMainMenu buttonMenu"
          onClick={() => this.catchIndexButtonClicked(0)}>
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
