import React from "react";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";
import bell from "../media/bell-off.png";

export class ContentHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="containerLogo">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <Bell />
      </header>
    );
  }
}

class Bell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bellOnOff: false}
  }
  render() {
    return (
      <div>
        <div className="containerBellOf">
          <img src={bell} className="bellOff"  onClick={()=>this.setState({bellOnOff: !this.state.bellOnOff})}/>
        </div>
        <SubMenuOrders
          bellOnOff={this.state.bellOnOff}/>
      </div>
    );
  }
}

const SubMenuOrders = (props) =>{

  const classSubMenuOrders= props.bellOnOff=== true? 'containerSubMenuOrdersOpen' : 'containerSubMenuOrdersClose'

  return(
    <div className={classSubMenuOrders} bellOnOff={props.bellOnOff}>
      <button className="containerEachOrderSubMenu">Pedido mesa 1</button>
      <button className="containerEachOrderSubMenu">Pedido mesa 2</button>
      <button className="containerEachOrderSubMenu">Pedido mesa 3</button>
      <button className="containerEachOrderSubMenu">Pedido mesa 4</button>
      <button className="containerEachOrderSubMenu">Pedido mesa 5</button>
      <button className="containerEachOrderSubMenu">Pedido mesa 6</button>
    </div>
  )
}

// const ModalOrders = ({ modalVisibility }) => {
//   const classModal = modalVisibility ? "modal display-block" : "modal display-none";
//   return (
//     <div className={classModal}>
//       <section className="modal-main">
//         <div className="containerModal">
//           <label className="textModal">Haz enviado el pedido a cocina</label>
//           <Link to="/mesero"><button className="btnModal">VOLVER</button></Link>
//         </div>
//       </section>
//     </div>
//   );
// };

export class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.tableChoose = this.tableChoose.bind(this);
  }
  tableChoose(event) {
    sessionStorage.setItem(
      "table",
      JSON.stringify({
        table: event.target.value,
      })
    );
  }

  render() {
    return (
      <div style={{ backgroundColor: "#c7c2c2" }}>
        <ContentHeader />
        <div className="containerTablesView">
          <div className="containerButtonsTables">
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 1"
                onClick={this.tableChoose}>
                Mesa 1
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 2"
                onClick={this.tableChoose}
              >
                Mesa 2
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 3"
                onClick={this.tableChoose}
              >
                Mesa 3
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 4"
                onClick={this.tableChoose}
              >
                Mesa 4
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 5"
                onClick={this.tableChoose}
              >
                Mesa 5
              </button>
            </Link>
            <Link to="/mesero/mesa">
              <button
                className="buttonsTables"
                value="MESA 6"
                onClick={this.tableChoose}
              >
                Mesa 6
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
