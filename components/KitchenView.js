import React from "react";
import firebase from "../firebaseConfig";
import logo from "../media/logo.png";
const db = firebase.firestore();

class ContentHeaderKitchen extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="containerLogo">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </header>
    );
  }
}
export class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { kitchenOrders: [] };
  }
  componentDidMount() {
    db.collection("pedido")
      .get()
      .then((querySnapshot) => {
        const olis = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ kitchenOrders: olis });
      });
  }

  render() {
    const { kitchenOrders } = this.state;
    const kitchentList = kitchenOrders.map((order) => {
      return (
        <OrderTable key={order.mesa + "-" + order.hora} table={order.mesa}>
          {order.productos.map((product) => (
            <OrderProducts
              key={product.nombre + "-" + product.cantidad}
              product={product}
            />
          ))}
        </OrderTable>
      );
    });

    return (<div><ContentHeaderKitchen />
      <div>{kitchentList}</div>
    </div>);
  }
}

const OrderTable = ({ children, table }) => {
  return (
    <div>
      <h1>{table}</h1> <div>{children}</div>
    </div>
  );
};

const OrderProducts = ({ product }) => {
  return (
    <div>
      <div>{product.nombre}</div>
      <div>{product.cantidad}</div>
    </div>
  );
};
