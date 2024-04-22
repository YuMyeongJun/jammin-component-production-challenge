import { forwardRef, useRef } from "react";
import { IInputProps } from "./Input.types";
import classNames from "classnames";
import { inputClasses } from "./InputClasses";
import { composeRef } from "@modules";

export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { controlSize, className, ...inputProps } = args;

  const inputClassName = classNames(className, inputClasses.root, {
    [inputClasses.error]: false,
    [inputClasses.sm]: controlSize === "sm",
    [inputClasses.md]: controlSize === "md",
    [inputClasses.lg]: controlSize === "lg",
  });
  return (
    <input
      ref={composeRef(inputRef, ref)}
      className={inputClassName}
      onKeyDown={args.onKeyDown}
      onMouseDown={(e) => e.stopPropagation()}
      readOnly={args.readOnly}
      title={inputRef.current?.value}
      autoComplete="off"
      {...inputProps}
    />
  );
});
