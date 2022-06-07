import React from "react";
import { ButtonHTMLAttributes } from "react";
import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined, ...props }: ButtonProps): JSX.Element {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}
