import React, { Component } from "react";

interface IProps {
  renderChildren: (
    handleClick: (data: string) => void,
    handleSum: () => void,
    handleArithmeticOperation: (type: string) => void,
    resetCalculator: (displayValue: string, isTouched?: boolean) => void,
    screenDisplay: string
  ) => JSX.Element;
}

interface IState {
  screenDisplay: string;
  isTouched: boolean;
  isCalculated: boolean;
}
class CalculatorContainer extends Component<IProps, IState> {
  state = {
    screenDisplay: "0",
    isTouched: false,
    isCalculated: false
  };

  private arithmeticOperation: ((a: number, b: number) => number) | undefined;

  private arithmeticOperations = new Map([
    ["+", (a: number, b: number) => a + b],
    ["-", (a: number, b: number) => a - b],
    ["/", (a: number, b: number) => a / b],
    ["x", (a: number, b: number) => a * b]
  ]);

  private slots: { [index: string]: number } = {};

  handleSum = () => {
    if (this.isReadyToSumNumbers()) {
      const newValue = (this.arithmeticOperation as ((
        a: number,
        b: number
      ) => number))(this.slots["1"], this.slots["2"]).toString();

      this.resetArithmeticOperation();

      this.resetSlots();

      this.setSlot("1", newValue);

      this.setState({
        screenDisplay: newValue,
        isTouched: true,
        isCalculated: true
      });
    }
  };

  resetArithmeticOperation() {
    this.arithmeticOperation = undefined;
  }

  resetSlots() {
    this.slots = {};
  }

  isReadyToSumNumbers() {
    return Boolean(
      this.arithmeticOperation && this.slots["1"] && this.slots["2"]
    );
  }

  handleClick = (data: string) => {
    if (this.slots[1] && !this.arithmeticOperation && this.state.isCalculated) {
      // Reset calculator
      this.resetCalculator(data, true);
    } else {
      this.setState({
        screenDisplay:
          this.state.isTouched && !this.state.isCalculated
            ? this.state.screenDisplay + data
            : data,
        isTouched: true
      });
    }

    const slotKey = !this.arithmeticOperation ? "1" : "2";

    this.setSlot(slotKey, (this.slots[slotKey] || "0") + data);
  };

  setSlot(key: string, value: string) {
    this.slots[key] = parseFloat(value);
  }

  handleArithmeticOperation = (operation: string) => {
    this.arithmeticOperation = this.arithmeticOperations.get(
      operation.toLowerCase()
    );

    this.setState({
      screenDisplay: this.slots["1"] + operation,
      isCalculated: false
    });
  };

  resetCalculator = (displayValue: string, isTouched: boolean = false) => {
    this.arithmeticOperation = undefined;
    this.slots = {};
    this.setState({
      isTouched,
      screenDisplay: displayValue,
      isCalculated: false
    });
  };

  render() {
    return this.props.renderChildren(
      this.handleClick,
      this.handleSum,
      this.handleArithmeticOperation,
      this.resetCalculator,
      this.state.screenDisplay
    );
  }
}

export default CalculatorContainer;
