import { forwardRef, InputHTMLAttributes, useRef } from "react";

import { radioClasses } from "./RadioClasses";
import { composeRef } from "@modules";

export const Radio = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((args, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { children, name, ...inputProps } = args;

  return (
    <label className={radioClasses.container}>
      <input
        {...inputProps}
        className={radioClasses.root}
        type="radio"
        name={name}
        ref={composeRef(inputRef, ref)}
        disabled={args.disabled}
        checked={args.checked}
        value={args.value}
        defaultChecked={args.defaultChecked}
        onChange={args.onChange}
      />
      {children}
    </label>
  );
});
