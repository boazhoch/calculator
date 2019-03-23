import React, { FunctionComponent } from "react";
import style from "./Screen.module.css";

interface IProps {
  value?: string;
}

const screen: FunctionComponent<IProps> = (props: IProps) => (
  <div className={`screen ${style["screen"]} right`}>{props.value}</div>
);

export default screen;
