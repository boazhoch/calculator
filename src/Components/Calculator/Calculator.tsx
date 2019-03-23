import React, { Component } from "react";
import "./Calculator.css";

interface IProps {}

class Calculator extends Component<IProps> {
  render() {
    return <div className="calculator">{this.props.children}</div>;
  }
}

export default Calculator;
