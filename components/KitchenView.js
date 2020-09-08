import React from "react";
import { getOrder } from "../services/KitchenService.js";

export class Kitchen extends React.Component {
  render() {
    return <div>{getOrder()}</div>;
  }
}
