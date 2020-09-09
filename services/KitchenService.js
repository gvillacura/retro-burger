import firebase from "../firebaseConfig";
const db = firebase.firestore();

export const getOrder = () => {
  return db
    .collection("pedido")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
};
// let ordersStructured = [];

// orders.forEach((order) => {
//   const dataOrder = order.data();

//   if (typeof ordersStructured[dataOrder.mesa] !== "undefined") {
//     ordersStructured[dataOrder.mesa].push(dataOrder);
//   } else {
//     ordersStructured[dataOrder.mesa] = [dataOrder];
//   }
// });
