import firebase from "../firebaseConfig";
const db = firebase.firestore();

export const getOrders = async () => {
  const orders = await db.collection("pedido").get();
  let ordersStructured = [];

  orders.forEach((order) => {
    const dataOrder = order.data();

    if (typeof ordersStructured[dataOrder.mesa] !== "undefined") {
      ordersStructured[dataOrder.mesa].push(dataOrder);
    } else {
      ordersStructured[dataOrder.mesa] = [dataOrder];
    }
  });

  return ordersStructured;
};

export const getOrdersSimple = async () => {
  return await getOrders();
};
