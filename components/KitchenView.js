import React from "react";
import firebase from "../firebaseConfig";
import { ContentHeaderKitchen } from "./InitialView";
import SecondsToString from "./Counter";
import { idCurrenTime, currentDate } from "../services/MeseroService";

const db = firebase.firestore();

export class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kitchenOrders: [] };
  }

  componentDidMount() {
    db.collection("pedidos")
      .get()
      .then((querySnapshot) => {
        const olis = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ kitchenOrders: olis });
      });
  }

  componentDidUpdate() {
    db.collection("pedidos")
      .get()
      .then((querySnapshot) => {
        const olis = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ kitchenOrders: olis });
      });
  }

  render() {
    const { kitchenOrders } = this.state;

    const kitchentList = kitchenOrders.map((order) => {
      if (order.estadoPedido === "En proceso") {
        return (
          <OrderTable
            key={order.mesa + "-" + order.hora}
            valueButton={order.mesa + " " + order.hora}
            table={order.mesa}
            comments={order.comentario}
            preDate={order.date + " " + order.hora}
          >
            {order.productos.map((product) => (
              <OrderProducts
                key={product.nombre + "-" + product.cantidad}
                product={product}
              />
            ))}
          </OrderTable>
        );
      }
    });

    return (
      <div>
        <ContentHeaderKitchen />
        <div className="containerAllOrderKitchen">{kitchentList}</div>
      </div>
    );
  }
}

class OrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: this.getSeconds() };
  }

  getSeconds() {
    let thisTime = new Date(currentDate() + " " + idCurrenTime());
    let prevTime = new Date(this.props.preDate);
    return (thisTime.getTime() - prevTime.getTime()) / 1000;
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  render() {
    return (
      <div className="containerOrderButton">
        <div className="contailerEachOrderKitchen">
          <div className="tableNameCounter">
            <div className="tableNameKitchen">{this.props.table}</div>
            {/* {<div className="counterTime" onLoad={clock()}></div>} */}
            <div className="icon box">
              <i className="far fa-clock"></i>
            </div>
            <SecondsToString seconds={this.state.seconds} />
          </div>
          <div className="containerContentProductComments">
            <div className="containerContentProduct">{this.props.children}</div>
            <div className="containerComment">
              Comentarios: <br /> {this.props.comments}
            </div>
          </div>
        </div>
        <div className="containerBtnReadyKitchen">
          <button
            className="btnReadyKitchen"
            value={this.props.valueButton}
            onClick={(e) => finishOrder(e)}
          >
            Listo
          </button>
        </div>
      </div>
    );
  }
}

const OrderProducts = ({ product }) => {
  return (
    <div className="contentProduct">
      <div>{product.nombre}</div>
      <div>x{product.cantidad}</div>
    </div>
  );
};

const finishOrder = (e) => {
  const valueButton = e.target.value;
  db.collection("pedidos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (valueButton === doc.data().mesa + " " + doc.data().hora) {
          firebase
            .firestore()
            .collection("pedidos")
            .doc(doc.data().mesa + " " + doc.data().hora)
            .update({
              estadoPedido: "Terminado",
            });
        } else {
          console.log("no eran iguales");
        }
      });
    });
};
