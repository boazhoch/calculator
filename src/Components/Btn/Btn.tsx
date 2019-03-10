import React from "react";

interface IProps {
  onClick(value: string): void;
  value: string;
  label: string;
 }

const btn = (props: IProps) => <button onClick={() => props.onClick(props.value)}>{props.label}</button>


export default btn;
