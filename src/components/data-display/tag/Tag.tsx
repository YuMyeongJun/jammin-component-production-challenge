import { forwardRef, useRef, useState } from "react";
import BasicClose from "@assets/icons/ic_basic_close.svg?react";
import { Flex } from "@components";
import classNames from "classnames";

import { ITagProps } from "./Tag.types";
import { tagClasses } from "./TagClasses";

export const Tag = forwardRef<HTMLSpanElement, ITagProps>((args, ref) => {
  const {
    icon,
    color,
    closeIcon,
    bordered = true,
    children,
    fontColor,
    onClose,
    style,
    className,
    ...props
  } = args;

  const closeRef = useRef<HTMLSpanElement>(null);

  const rootClassName = classNames(tagClasses.root, {
    [tagClasses.option.bordered]: bordered,
  });
  const iconClassName = classNames(
    tagClasses.option.icon,
    icon ? tagClasses.option.inline : tagClasses.option.hidden,
  );
  const closeClassName = classNames(
    tagClasses.option.close,
    closeIcon ? tagClasses.option.inline : tagClasses.option.hidden,
  );

  return (
    <span
      ref={ref}
      {...props}
      className={classNames(
        rootClassName,
        className,
        `bg-[var(--jammin-primary-color-light)]`,
        "text-[var(--jammin-primary-color-main)]",
      )}
      style={{
        ...style,
        backgroundColor: color,
        borderColor: color,
        color: fontColor,
      }}
    >
      {icon && (
        <span {...props} className={classNames(iconClassName)}>
          {icon}
        </span>
      )}
      {children}
      {closeIcon && (
        <span
          {...props}
          className={classNames(closeClassName)}
          onClick={(e) => {
            onClose?.(e);
          }}
          ref={closeRef}
        >
          {closeIcon === true ? (
            <BasicClose fill={"var(--jammin-primary-color-main)"} />
          ) : (
            closeIcon
          )}
        </span>
      )}
    </span>
  );
});
