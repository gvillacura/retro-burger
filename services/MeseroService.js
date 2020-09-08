import firebase from "../firebaseConfig";
const db = firebase.firestore();

export const saveOrder = (order) => {
  return db.collection("pedido").add({
    productos: order,
    mesa: "mesa 1",
    hora: "10:00",
  });
};
