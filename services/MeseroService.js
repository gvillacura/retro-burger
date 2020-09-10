import firebase from "../firebaseConfig";
const db = firebase.firestore();


const idCurrenTime = () => {
  let idDate = new Date();
  const hours = (idDate.getHours() < 10 ? '0' : '') + idDate.getHours();
  const minutes = (idDate.getMinutes() < 10 ? '0' : '') + idDate.getMinutes();
  const seconds = (idDate.getSeconds() < 10 ? '0' : '') + idDate.getSeconds();
  idDate = `${hours}:${minutes}:${seconds}`;
  return idDate;
}

idCurrenTime();

const currentDate= () => {
  let date = new Date();

  const day = date.getDate();
  const month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1);
  const year = date.getFullYear();

  date = `${year}/${month}/${day}`;
  return date;
};


export const saveOrder = (order, price, estado) => {
  return db.collection("pedidos").doc(JSON.parse(sessionStorage.table).table + " " + idCurrenTime()).set({
    productos: order,
    totalPrice: price,
    estadoPedido: estado,
    mesa: JSON.parse(sessionStorage.table).table,
    date: currentDate(),
    hora: idCurrenTime(),
  });
};
