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
