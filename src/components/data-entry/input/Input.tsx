import { forwardRef, useRef } from "react";
import { IInputProps } from "./Input.types";
import classNames from "classnames";
import { inputClasses } from "./InputClasses";
import { composeRef } from "@modules";

export const Input = forwardRef<HTMLInputElement, IInputProps>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleRef = composeRef(inputRef, ref);
  const { controlSize, ...inputProps } = args;

  const inputClassName = classNames(args.className, inputClasses.root, {
    [inputClasses.error]: false,
    [inputClasses.normal.sm]: controlSize === "sm",
    [inputClasses.normal.md]: controlSize === "md",
    [inputClasses.normal.lg]: controlSize === "lg",
  });
  return (
    <input
      ref={handleRef}
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
