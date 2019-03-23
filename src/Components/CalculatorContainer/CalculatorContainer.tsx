import React, { Component } from "react";
import { IHttp, OPERATIONS } from "../../services/http/IHttp";

interface IProps {
  notifier: any;
  apiService: IHttp;
  renderChildren: (
    handleClick: (data: string) => void,
    handleSum: () => void,
    handleArithmeticOperation: (type: OPERATIONS) => void,
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

  private arithmeticOperation?: string;
  private isLock: boolean = false;

  private slots: { [index: string]: number } = {};

  private lockKeys(shouldLock: boolean = true) {
    this.isLock = shouldLock;
  }

  handleSum = () => {
    if (this.isReadyToSumNumbers()) {
      this.lockKeys();
      this.props.notifier.info(
        "Calculator is now locked while calculating result."
      );

      this.props.apiService
        .sum(
          this.arithmeticOperation as OPERATIONS,
          this.slots["1"],
          this.slots["2"]
        )
        .then(response => {
          if (!response.ok) {
            console.log(response.json());
            throw new Error("err");
          }
          return response.json();
        })
        .then(res => {
          this.resetArithmeticOperation();
          this.resetSlots();
          this.setSlot("1", res.data);
          this.setState(
            {
              screenDisplay: res.data,
              isTouched: true,
              isCalculated: true
            },
            () => {
              this.lockKeys(false);
              this.props.notifier.success("Calculated result!🦄");
            }
          );
        })
        .catch((err: Error) => {
          this.lockKeys(false);
          this.props.notifier.error(err.message);
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
    if (this.isLock) {
      this.props.notifier.warning("Cannot click while calculating");
    }

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

  handleArithmeticOperation = (operation: any) => {
    this.arithmeticOperation = OPERATIONS[operation];

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
