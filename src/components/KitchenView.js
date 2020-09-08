import React from "react";
import firebase from "../firebaseConfig";
import { getOrders, getOrdersSimple } from "../services/KitchenService";
const db = firebase.firestore();

export class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kitchenOrders: [] };
  }
  componentDidMount() {
    // db.collection("pedido")
    //   .get()
    //   .then((querySnapshot) => {
    //     const olis = querySnapshot.docs.map((doc) => doc.data());
    //     this.setState({ kitchenOrders: olis });
    //   });

    const orders = getOrdersSimple();
    orders.then((orderList) => {
      console.log(orderList);
      this.setState({ kitchenOrders: orderList });
    });
  }

  render() {
    // const { kitchenOrders } = this.state;
    return (
      <div>
        {/* {kitchenOrders.map((orders) =>
          orders.productos.map((products) => (
            <div>
              <div>{orders.mesa}</div>
              <div>{products.nombre}</div>
              <div>{products.cantidad}</div>
            </div>
          ))
        )} */}
      </div>
    );
  }
}
