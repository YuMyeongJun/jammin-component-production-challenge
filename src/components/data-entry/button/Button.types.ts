import { ButtonHTMLAttributes } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button 높이 조절
   * sm: 28px
   * md: 32px
   * lg: 38px
   * @default md
   */
  controlSize?: "sm" | "md" | "lg";
}
