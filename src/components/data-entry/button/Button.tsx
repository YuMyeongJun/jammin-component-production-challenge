import { forwardRef, useRef } from "react";
import { IButtonProps } from "./Button.types";
import { composeRef } from "@modules";
import classNames from "classnames";
import { buttonClasses } from "./ButtonClasses";

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (args, ref) => {
    const { controlSize, className, ...buttonProps } = args;
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const rootClassName = classNames(className, buttonClasses.root, {
      [buttonClasses.sm]: controlSize === "sm",
      [buttonClasses.md]: controlSize === "md",
      [buttonClasses.lg]: controlSize === "lg",
    });
    return (
      <button
        ref={composeRef(buttonRef, ref)}
        className={rootClassName}
        {...buttonProps}
      >
        {args.children}
      </button>
    );
  },
);
