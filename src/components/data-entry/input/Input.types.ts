import { InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input 높이 조절
   * sm: 미정
   * md: 32px
   * lg: 38px
   * @default md
   * @type "sm" | "md" | "lg"
   */
  controlSize?: "sm" | "md" | "lg";
}
