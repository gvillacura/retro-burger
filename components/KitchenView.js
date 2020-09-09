import React from "react";
import firebase from "../firebaseConfig";
const db = firebase.firestore();

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

  // const olisContent = olis.map((item) => {
  //   return (
  //     <div key={item.productos.nombre}>
  //       <div>
  //         {item.productos.nombre} x{item.productos.cantidad}
  //       </div>
  //     </div>
  //   );
  // });
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

    return <div>{kitchentList}</div>;
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
