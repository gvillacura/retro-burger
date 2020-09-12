import React from "react";
import firebase from "../firebaseConfig";
import SecondsCounter from "./Counter";
import {ContentHeaderKitchen} from './InitialView';

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

  componentDidUpdate(prevProps) {
    if (prevProps.orderToSend !== this.props.orderToSend) {
      db.collection("pedidos")
        .get()
        .then((querySnapshot) => {
          const olis = querySnapshot.docs.map((doc) => doc.data());
          this.setState({ kitchenOrders: olis });
        });
    }
  }

  render() {
    const { kitchenOrders } = this.state;
    // let counter = 0;

    // setInterval() {
    //   <SecondsCounter seconds={counter} />;
    //   counter += 1;
    // }, 1000);

    const kitchentList = kitchenOrders.map((order) => {
      if (order.estadoPedido === "En proceso") {
        return (
          <OrderTable
            key={order.mesa + "-" + order.hora}
            valueButton={order.mesa + " " + order.hora}
            table={order.mesa}
            comments={order.comentario}
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

const OrderTable = ({ children, table, valueButton, comments }) => {
  return (
    <div className="containerOrderButton">
      <div className="contailerEachOrderKitchen">
        <div className="tableNameCounter">
          <div className="tableNameKitchen">{table}</div>
          <SecondsCounter seconds={0} />;
        </div>

        <div className="containerContentProductComments">
          <div className="containerContentProduct">{children}</div>
          <div className="containerComment">
            Comentarios: <br /> {comments}
          </div>
        </div>
      </div>
      <div className="containerBtnReadyKitchen">
        <button
          className="btnReadyKitchen"
          value={valueButton}
          onClick={(e) => finishOrder(e)}
        >
          Listo
        </button>
      </div>
    </div>
  );
};

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
