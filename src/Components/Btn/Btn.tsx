import React, { Component } from "react";

interface IProps {
  onClick(value: string): void;
 }

const Btn = (props: IProps) => <button onClick={props.onClick}></button>


export default Btn;
