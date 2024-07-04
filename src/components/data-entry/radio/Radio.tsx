import { forwardRef, InputHTMLAttributes, useState } from "react";

import { radioClasses } from "./RadioClasses";

export const Radio = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((args, ref) => {
  const [value, setValue] = useState<any>();
  const { children, name, ...inputArgs } = args;

  return (
    <label className={radioClasses.container}>
      <input
        {...inputArgs}
        className={radioClasses.root}
        type="radio"
        name={name}
        ref={ref}
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

Radio.displayName = "jammin_radio";
