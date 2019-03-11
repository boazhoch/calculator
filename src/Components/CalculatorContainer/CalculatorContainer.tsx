import React, { Component } from "react";
import Calculator from "../Calculator/Calculator";
import Screen from "../Screen/Screen";
class CalculatorContainer extends Component {
  render() {
    return (
      <Calculator>
        <Screen />
      </Calculator>
    );
  }
}

export default CalculatorContainer;
