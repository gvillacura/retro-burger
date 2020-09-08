import firebase from "../firebaseConfig";
const db = firebase.firestore();

export const saveOrder = (order, price) => {
  return db.collection("pedido").add({
    productos: order,
    totalPrice: price,
    mesa: "mesa 1",
    hora: "10:00",
  });
};
