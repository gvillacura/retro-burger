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
    db.collection("pedidos")
      .get()
      .then((querySnapshot) => {
        const olis = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ kitchenOrders: olis });
      });
  }

  render() {
    const { kitchenOrders } = this.state;
    const kitchentList = kitchenOrders.map((order) => {
      if (order.estadoPedido === "En Proceso") {
        return (
          <OrderTable key={order.mesa + "-" + order.hora} valueButton={order.mesa + " " + order.hora} table={order.mesa}>
            {order.productos.map((product) => (
              <OrderProducts
                key={product.nombre + "-" + product.cantidad}
                product={product}
              />
            ))}
          </OrderTable>
        )
      };
    });

    return (
      <div>
        <ContentHeaderKitchen />
        <div className="containerAllOrderKitchen">
          {kitchentList}
        </div>
      </div>);
  }
}

const OrderTable = ({ children, table, valueButton }) => {
  return (
    <div className="containerOrderButton">
      <div className="contailerEachOrderKitchen">
        <div className="tableNameCounter">
          <div className="tableNameKitchen">
            {table}
          </div>
          {/* <div className="counterTime" onLoad={setTimeout(clock, 500)}>
            {clock()}
          </div> */}
        </div>

        <div className="containerContentProductComments">
          <div className="containerContentProduct">
            {children}
          </div>
          <div className="containerComment">
            Comentarios
        </div>
        </div>
      </div>
      <div className="containerBtnReadyKitchen">
        <button className="btnReadyKitchen" value={valueButton} onClick={(e)=>finishOrder(e)}>Listo</button>
      </div>
    </div>
  );
};

const OrderProducts = ({ product }) => {
  return (
    <div className="contentProduct">
      <div>{product.nombre}</div>
      <div>x{product.cantidad}</div>
    </div>
  );
};

// const clock=()=>{
//   let actualTime= new Date();
//   let hour = actualTime.getHours();
//   let min = actualTime.getMinutes();
//   let seg = actualTime.getSeconds();
//   min = checkTime(min);
//   seg = checkTime(seg);
//   setTimeout(clock, 500)
//   return(hour + ":" + min + ":" + seg)
// }
// function checkTime(i) {
//   if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
//   return i;
// }

// function Clock(props) {
//   const [date, setDate] = useState(new Date());

//   //Replaces componentDidMount and componentWillUnmount
//   useEffect(() => {
//     var timerID = setInterval(() => tick(), 1000);

//     return function cleanup() {
//       clearInterval(timerID);
//     };
//   });

//   function tick() {
//     setDate(new Date());
//   }

//   return (
//     <div>
//       <h2> {date.toLocaleTimeString()}</h2>
//     </div>
//   );
// }

const finishOrder =(e)=>{
  const valueButton= e.target.value;
  db.collection('pedidos').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (valueButton === (doc.data().mesa+" "+doc.data().hora)) {
      
        firebase.firestore().collection('pedidos').doc(doc.data().mesa+" "+doc.data().hora).update({
          estadoPedido: "Terminado"
        })
      }
      else{
        console.log("no eran iguales")
      }
    })
  })
}



  