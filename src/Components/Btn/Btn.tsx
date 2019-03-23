import React from "react";
import style from "./Btn.module.css";
interface IProps {
  onClick(value: string): void;
  value: string;
  label: string;
  className?: string[];
}

const btn = (props: IProps) => {
  const classNames =
    props.className &&
    props.className
      .map(name => {
        return style[name];
      })
      .join(" ");

  return (
    <button
      className={`${style["btn"] + " " + classNames}`}
      onClick={() => props.onClick(props.value)}
      data-label={props.label}
    />
  );
};

export default btn;
