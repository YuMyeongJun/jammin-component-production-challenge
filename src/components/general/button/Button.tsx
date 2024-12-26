import React, { forwardRef, useRef, useState } from "react";
import { composeRef } from "@modules/utils/composeRef/composeRef";
import classNames from "classnames";

import { ButtonProps, ButtonTypeMap, ExtendButton } from "./Button.types";
import { buttonClasses as classes } from "./buttonClasses";

export const Button = forwardRef(function Button<
  RootComponentType extends React.ElementType,
>(props: ButtonProps<RootComponentType>, ref: React.ForwardedRef<Element>) {
  const {
    id,
    baseButton = false,
    children,
    className,
    color = "default",
    component = "button",
    disabled = false,
    block = false,
    endIcon: endIconProp,
    startIcon: startIconProp,
    shape = "round",
    size = "md",
    variant = "outlined",
    slotProps,
    tabIndex,
    type,
    onClick,
    ...other
  } = props;

  const buttonRef = useRef<
    HTMLButtonElement | HTMLAnchorElement | HTMLElement
  >();

  const [elementTagName, setElementTagName] = useState<string>("");

  const updateElementTagName = (instance: HTMLElement | null) => {
    setElementTagName(instance?.tagName ?? "");
  };
  const handleRef = composeRef(updateElementTagName, buttonRef, ref);

  let RootComponent = component;

  // `href` 또는 `to` prop가 제공될 때 링크를 렌더링하는 데 사용되는 구성 요소.
  if (RootComponent === "button" && (other.href || other.to)) {
    RootComponent = "a";
  }

  const buttonProps: {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    disabled?: boolean;
    role?: React.AriaRole;
    "aria-disabled"?: React.AriaAttributes["aria-disabled"];
    tabIndex?: number;
  } = {};

  if (tabIndex !== undefined) {
    buttonProps.tabIndex = tabIndex;
  }

  if (elementTagName === "BUTTON") {
    buttonProps.type = type ?? "button";
    buttonProps.disabled = disabled;
  } else if (elementTagName !== "") {
    if (!other.href && !other.to) {
      buttonProps.role = "button";
      buttonProps.tabIndex = tabIndex ?? 0;
    }
    if (disabled) {
      buttonProps.tabIndex = disabled ? (tabIndex ?? 0) : -1;
    }
  }

  const rootClassName = classNames(
    baseButton ? classes.baseButton : classes.root,
    baseButton
      ? {}
      : {
          // disabled
          [classes.disabled]: disabled,
          // block
          [classes.block]: block,
          // variant
          [classes.text]: variant === "text",
          [classes.contained]: variant === "contained",
          [classes.outlined]: variant === "outlined",
          [classes.dashed]: variant === "dashed",
          // color
          [classes.colorPrimary]: color === "primary",
          [classes.colorSecondary]: color === "secondary",
          [classes.colorSuccess]: color === "success",
          [classes.colorError]: color === "error",
          [classes.colorInfo]: color === "info",
          [classes.colorWarning]: color === "warning",
          [classes.colorDark]: color === "dark",
          // shape
          [classes.shapeCircle]: shape === "circle",
          [classes.shapeRound]: shape === "round",
          // size
          [classes.sizeXSmall]: size === "xs",
          [classes.sizeSmall]: size === "sm",
          [classes.sizeMedium]: size === "md",
          [classes.sizeLarge]: size === "lg",
        },
    className,
  );

  const {
    className: iconClassName,
    style: iconStyle,
    ...iconRest
  } = slotProps?.iconWrapper ?? {};

  const startIcon = startIconProp && (
    <span
      className={classNames(classes.startIcon, `icon-${size}`, iconClassName)}
      style={iconStyle}
      {...iconRest}
    >
      {startIconProp}
    </span>
  );

  const endIcon = endIconProp && (
    <span
      className={classNames(classes.endIcon, `icon-${size}`, iconClassName)}
      style={iconStyle}
      {...iconRest}
    >
      {endIconProp}
    </span>
  );

  return (
    <RootComponent
      type={type}
      id={id}
      className={rootClassName}
      onClick={
        disabled
          ? (e: React.MouseEvent) => {
              e.preventDefault();
            }
          : onClick
      }
      ref={handleRef}
      {...buttonProps}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
    </RootComponent>
  );
}) as ExtendButton<ButtonTypeMap>;
