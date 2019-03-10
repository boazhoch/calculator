import React, { FunctionComponent } from "react";

interface IProps {}

const keypadRow: FunctionComponent<IProps> = ({ children }) => (
  <div className="row">{children}</div>
);

export default keypadRow;
