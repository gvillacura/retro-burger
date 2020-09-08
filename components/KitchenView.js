import React from "react";
import firebase from "../firebaseConfig";
const db = firebase.firestore();


export class Kitchen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { kitchenOrders: [] }
  }
  componentDidMount() {
    db.collection("pedido").get().then((querySnapshot) => {
      const olis = querySnapshot.docs.map((doc) => doc.data());
      this.setState({kitchenOrders : olis})
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
    const {kitchenOrders} =this.state
    return (
    <div>
      {kitchenOrders.map(orders =>(
        orders.productos.map(products =>(
          <div>
            <div>{orders.mesa}</div>
            <div>{products.nombre}</div>
            <div>{products.cantidad}</div>
          </div>)
        )
          
      ))}
 
    </div>
    )
  };

}
