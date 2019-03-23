import React, { Component } from "react";
import CalculatorContainer from "../CalculatorContainer/CalculatorContainer";
import Calculator from "../Calculator/Calculator";
import Btn from "../Btn/Btn";
import Screen from "../Screen/Screen";
import RequesterFactory from "../../services/RequesterFactory";
import HttpRequester from "../../services/http";
import { OPERATIONS } from "../../services/http/IHttp";
import CONFIG from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface IProps {}

const requesterFactory = new RequesterFactory(
  { http: HttpRequester },
  CONFIG.endPoint
);

const httpService = requesterFactory.getService("http");

class App extends Component<IProps> {
  render() {
    return (
      <>
        <ToastContainer />
        <CalculatorContainer
          notifier={toast}
          apiService={httpService}
          renderChildren={(
            handleClick: (data: string) => void,
            handleSum: () => void,
            handleArithmeticOperation: (type: OPERATIONS) => void,
            resetCalculator: (
              displayValue: string,
              isTouched?: boolean
            ) => void,
            screenDisplay: string
          ) => {
            return (
              <Calculator>
                <Screen value={screenDisplay} />
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"7"}
                    label={"7"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"8"}
                    label={"8"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"9"}
                    label={"9"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"+"}
                    label={"+"}
                    onClick={data => {
                      handleArithmeticOperation(data as OPERATIONS);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"-"}
                    label={"-"}
                    onClick={data => {
                      handleArithmeticOperation(data as OPERATIONS);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"4"}
                    label={"4"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"5"}
                    label={"5"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"6"}
                    label={"6"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"x"}
                    label={"x"}
                    onClick={data => {
                      handleArithmeticOperation(data as OPERATIONS);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"/"}
                    label={"/"}
                    onClick={data => {
                      handleArithmeticOperation(data as OPERATIONS);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"1"}
                    label={"1"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"2"}
                    label={"2"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"3"}
                    label={"3"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item btn__equal">
                  <Btn
                    className={[
                      "btn--rounded",
                      "btn--with-label",
                      "btn--label--green"
                    ]}
                    value={"="}
                    label={"="}
                    onClick={() => {
                      handleSum();
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={[
                      "btn--circle",
                      "btn--with-label",
                      "btn--danger"
                    ]}
                    value={"ac"}
                    label={"AC"}
                    onClick={() => {
                      resetCalculator("0");
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"."}
                    label={"."}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
                <div className="calculator-item text-center">
                  <Btn
                    className={["btn--circle", "btn--with-label"]}
                    value={"0"}
                    label={"0"}
                    onClick={data => {
                      handleClick(data);
                    }}
                  />
                </div>
              </Calculator>
            );
          }}
        />
      </>
    );
  }
}

export default App;
