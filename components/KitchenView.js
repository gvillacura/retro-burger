import React from "react";
import { getOrder } from "../services/KitchenService.js";

export class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  async componentDidMount() {
    const orders = await getOrder();
    let orderList = [];
    orders.forEach((order) => {
      orderList.push(order.data());
    });

    this.setState({ orders: orderList });
  }

  render() {
    const ordersList = this.state.orders.map((order) =>
      order.productos.map((pedido) => <li>{pedido.productos.nombre}</li>)
    );
    return <div>OK{ordersList}</div>;
  }
}
